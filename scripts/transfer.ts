import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  getAdminKeypair,
  getUserNFTs,
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

    // // Get NFTs owned by the sender
    // const nfts = await getUserNFTs(
    //   client,
    //   adminKeypair.toSuiAddress(),
    //   "ART20"
    // );

    // if (!nfts.length) {
    //   throw new Error("No NFTs found to transfer");
    // }

    const COLLECTION_ID = "0x1ff9ffc9b363ca2e2671e47754f313557e6dfd617272b16d60dff44170d3738f";

const nfts = await getUserNFTsByCollection(
  client,
  adminKeypair.toSuiAddress(),
  "ART20",
  COLLECTION_ID
);

if (!nfts.length) {
  throw new Error(`No NFTs found for collection ${COLLECTION_ID}`);
}
    console.log("Found NFTs:", nfts);

    const txTransfer = new Transaction();
    txTransfer.setSender(adminKeypair.toSuiAddress());

    // Get gas coin
    const coins = await client.getCoins({
      owner: adminKeypair.toSuiAddress(),
      coinType: "0x2::sui::SUI"
    });

    const gasCoin = coins.data[0];
    console.log("Using gas coin:", gasCoin.coinObjectId);

    // Set gas payment
    txTransfer.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    // Recipient address - Replace with actual recipient address
    const recipientAddress = "0xc182b49a9ca8dee83125ae1a5dac58ff91b6ff394a821d905c7314bf580ed4b1";

    // Create vector of NFTs to transfer
    const nftObjects = nfts.map(nftId => txTransfer.object(nftId));

    txTransfer.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::transfer_art20_in_quantity`,
      arguments: [
        txTransfer.makeMoveVec({ 
          elements: nftObjects 
        }), // vector<NFT>
        txTransfer.pure.address(recipientAddress), // single address
        txTransfer.pure.u64(1), // quantity to transfer
        txTransfer.object("0x1ff9ffc9b363ca2e2671e47754f313557e6dfd617272b16d60dff44170d3738f"), // collection cap
        txTransfer.makeMoveVec({ 
          elements: [txTransfer.object(userBalanceId)]
        }), // vector<UserBalance>
        txTransfer.object("0x6"), // clock
      ],
    });

    txTransfer.setGasBudget(200000000);

    console.log("Executing transfer transaction...");
    const res = await client.signAndExecuteTransaction({
      transaction: txTransfer,
      signer: adminKeypair,
    });

    console.log("Transfer transaction result:", res);

    // Wait for transaction to be confirmed
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Verify transfer by checking NFTs at new address
    const recipientNFTs = await getUserNFTs(
      client,
      recipientAddress,
      "ART20"
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