import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  getAdminKeypair,
  getUserNFTsByCollection,
} from "./utils";


async function main() {

  const COLLECTION_CAP = "0x95c322d6a893dd03bf90c3bf85df7789c632d09c7c6800b2846862124c278582";
  const TOKEN_COUNTER = "0x78ac03ae18afa19eb73ba2494a7eaeeb2b0ad9a30ecb4bda8ab669bde303954f";
  const RECIPIENT_ADDRESS = "0xc182b49a9ca8dee83125ae1a5dac58ff91b6ff394a821d905c7314bf580ed4b1";


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
  
      const userBalanceId = userBalances.data[0].data?.objectId;
      if (!userBalanceId) {
        throw new Error("UserBalance ID is undefined");
      }
  
      // Get NFTs and properly type them
      const existingNfts = await client.getOwnedObjects({
        owner: adminKeypair.toSuiAddress(),
        filter: {
          StructType: `${PACKAGE_ADDRESS}::ART20::NFT`
        },
        options: { showContent: true }
      });
  
      // Only include NFTs that have valid objectId and assetId
      const validNfts = existingNfts.data
        .map(nft => ({
          objectId: nft.data?.objectId,
          assetId: (nft.data?.content as any)?.fields?.asset_id
        }))
        .filter((nft): nft is { objectId: string; assetId: number } => 
          nft.objectId !== undefined && nft.assetId !== undefined
        );
  
      console.log("Existing NFTs:", validNfts);
  
      // Get gas coin
      const coins = await client.getCoins({
        owner: adminKeypair.toSuiAddress(),
        coinType: "0x2::sui::SUI"
      });
  
      if (!coins.data[0]?.coinObjectId) {
        throw new Error("No gas coin found");
      }
  
      // Mint transaction
      const tx = new Transaction();
      tx.setSender(adminKeypair.toSuiAddress());
  
      tx.setGasPayment([{
        objectId: coins.data[0].coinObjectId,
        version: coins.data[0].version,
        digest: coins.data[0].digest
      }]);
  
      // Mint one new NFT
      tx.moveCall({
        target: `${PACKAGE_ADDRESS}::ART20::mint_additional_art20`,
        arguments: [
          tx.object(COLLECTION_CAP),
          tx.pure.u64(1),
          tx.object(TOKEN_COUNTER),
          tx.object(userBalanceId),
          tx.object("0x6"),
        ],
      });
  
      console.log("Minting NFT...");
      const mintResult = await client.signAndExecuteTransaction({
        transaction: tx,
        signer: adminKeypair,
      });
  
      // Wait for mint to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // Get updated NFTs
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
  
      // Transfer transaction
      const transferTx = new Transaction();
      transferTx.setSender(adminKeypair.toSuiAddress());
      transferTx.setGasPayment([{
        objectId: coins.data[0].coinObjectId,
        version: coins.data[0].version,
        digest: coins.data[0].digest
      }]);
  
      transferTx.moveCall({
        target: `${PACKAGE_ADDRESS}::ART20::transfer_art20_by_asset_ids`,
        arguments: [
          transferTx.makeMoveVec({ 
            elements: [transferTx.object(newestNft.objectId)] // Now objectId is guaranteed to exist
          }),
      
          transferTx.pure.address(RECIPIENT_ADDRESS),
          tx.pure.u64(1), // quantity to transfer
          tx.object(COLLECTION_CAP),

          transferTx.makeMoveVec({ 
            elements: [transferTx.object(userBalanceId)]
          }),
          transferTx.object("0x6"),
        ],
      });
  
      transferTx.setGasBudget(200000000);
  
      console.log("Transferring NFT...");
      const transferResult = await client.signAndExecuteTransaction({
        transaction: transferTx,
        signer: adminKeypair,
      });
  
      console.log("Transfer complete:", transferResult);
  
    } catch (error) {
      console.error("Error:", error);
    }
  }


  main()