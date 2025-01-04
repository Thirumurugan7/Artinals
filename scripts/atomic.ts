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

    const COLLECTION_CAP = "0x1ff9ffc9b363ca2e2671e47754f313557e6dfd617272b16d60dff44170d3738f";
    const TOKEN_COUNTER = "0xd85ce3a747fcc08bb9d80ec61a3b5fcd1e5aa225774348617f714c5a31316b4a";
    const RECIPIENT_ADDRESS = "0xc182b49a9ca8dee83125ae1a5dac58ff91b6ff394a821d905c7314bf580ed4b1";

    // First mint call
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_additional_art20`,
      arguments: [
        tx.object(COLLECTION_CAP),
        tx.pure.u64(2), // number of NFTs to mint
        tx.object(TOKEN_COUNTER),
        tx.object(userBalanceId),
        tx.object("0x6"),
      ],
    });

    // Get newly minted NFTs
    const nfts = await getUserNFTsByCollection(
      client,
      adminKeypair.toSuiAddress(),
      "ART20",
      COLLECTION_CAP
    );

    if (!nfts.length) {
      throw new Error(`No NFTs found for collection ${COLLECTION_CAP}`);
    }

    // Add transfer call to the same transaction
    const nftObjects = nfts.map(nftId => tx.object(nftId));

    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::transfer_art20_in_quantity`,
      arguments: [
        tx.makeMoveVec({ 
          elements: nftObjects 
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