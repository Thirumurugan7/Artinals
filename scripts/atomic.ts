import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  getAdminKeypair,
  getUserNFTsByCollection,
} from "./utils";

async function main() {
  try {
    const client = new SuiClient({
      url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
    });

    const adminKeypair = getAdminKeypair("ED25519");
    console.log("Admin address:", adminKeypair.toSuiAddress());

    // Get user balance object
    const userBalances = await client.getOwnedObjects({
      owner: adminKeypair.toSuiAddress(),
      filter: {
        StructType: `${PACKAGE_ADDRESS}::ART20::UserBalance`
      },
      options: { showContent: true }
    });

    if (!userBalances.data.length) {
      throw new Error("No UserBalance found for this collection");
    }

    const userBalanceId = userBalances.data[0].data?.objectId;
    if (!userBalanceId) {
      throw new Error("UserBalance ID is undefined");
    }
    console.log("Using UserBalance:", userBalanceId);

    // Get gas coin
    const coins = await client.getCoins({
      owner: adminKeypair.toSuiAddress(),
      coinType: "0x2::sui::SUI"
    });

    const gasCoin = coins.data[0];
    console.log("Using gas coin:", gasCoin.coinObjectId);

    // Create single transaction for both mint and transfer
    const tx = new Transaction();
    tx.setSender(adminKeypair.toSuiAddress());

    // Set gas payment
    tx.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    const COLLECTION_CAP = "0xf12e9d5428241fe428f59c2b550d302d07599adf8d4f63042f954082d73b59a7";
    const TOKEN_COUNTER = "0x78ac03ae18afa19eb73ba2494a7eaeeb2b0ad9a30ecb4bda8ab669bde303954f";
    const RECIPIENT_ADDRESS = "0xd001f2c15bee14d18acb25985ecdc939acf239455312b51e318a60b66bdaded8";

    // First mint call
   const mint =  tx.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_additional_art20`,
      arguments: [
        tx.object(COLLECTION_CAP),
        tx.pure.u64(1), // number of NFTs to mint
        tx.object(TOKEN_COUNTER),
        tx.object(userBalanceId),
        tx.object("0x6"),
      ],
    });

    console.log("mint ", mint);
    console.log("mint res ", mint.Result);
    
    // Get newly minted NFTs
    // const nfts = await getUserNFTsByCollection(
    //   client,
    //   adminKeypair.toSuiAddress(),
    //   "ART20",
    //   COLLECTION_CAP
    // );

    // if (!nfts.length) {
    //   throw new Error(`No NFTs found for collection ${COLLECTION_CAP}`);
    // }

    // // Add transfer call to the same transaction

    // console.log("nfts",nfts);
    
    // const nftObjects = nfts.map(nftId => tx.object(nftId));

    const newNfts = await client.getOwnedObjects({
        owner: adminKeypair.toSuiAddress(),
        filter: {
          StructType: `${PACKAGE_ADDRESS}::ART20::NFT`
        },
        options: { showContent: true }
      });
  
      // Filter for valid NFTs
      const validNewNfts = newNfts.data
        .map(nft => ({
          objectId: nft.data?.objectId,
          assetId: Number((nft.data?.content as any)?.fields?.asset_id)
        }))
        .filter((nft): nft is { objectId: string; assetId: number } => 
          nft.objectId !== undefined && nft.assetId !== undefined
        );
  
      if (validNewNfts.length === 0) {
        throw new Error("No valid NFTs found after minting");
      }
  
      // Find newest NFT
      const newestNft = validNewNfts.sort((a, b) => b.assetId - a.assetId)[0];
      console.log("Newest NFT:", newestNft);
  

    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::transfer_art20_in_quantity`,
      arguments: [
        tx.makeMoveVec({ 
            elements: [tx.object(newestNft.objectId)] // Now objectId is guaranteed to exist
        }),
        tx.pure.address(RECIPIENT_ADDRESS),
        tx.pure.u64(1), // quantity to transfer

        tx.object(COLLECTION_CAP),
     
        tx.makeMoveVec({ 
          elements: [tx.object(userBalanceId)]
        }),
        tx.object("0x6"),
      ],
    });

    tx.setGasBudget(200000000);

    console.log("Executing combined mint and transfer transaction...");
    const res = await client.signAndExecuteTransaction({
      transaction: tx,
      signer: adminKeypair,
    });

    console.log("Transaction result:", res);

    // Wait for transaction to be confirmed
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Verify final state
    const recipientNFTs = await getUserNFTsByCollection(
      client,
      RECIPIENT_ADDRESS,
      "ART20",
      COLLECTION_CAP
    );

    console.log("Recipient's NFTs after transfer:", recipientNFTs);

  } catch (error) {
    console.error("Error in main:", error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});