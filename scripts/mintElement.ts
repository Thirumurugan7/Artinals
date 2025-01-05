import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  ADMIN_CAP,
  getAdminKeypair,
  getUserNFTs,
} from "./utils";

async function main() {
  try {
    const client = new SuiClient({
      url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
    });

    const adminKeypair = getAdminKeypair("ED25519");
    console.log("Admin address:", adminKeypair.toSuiAddress());

    // First get user balance object - using correct filter type
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
console.log("user balance", userBalances.data);
    const userBalanceId = userBalances.data[0].data?.objectId;
    if (!userBalanceId) {
      throw new Error("UserBalance ID is undefined");
    }
    console.log("Using UserBalance:", userBalanceId);

    const txMintElement = new Transaction();
    txMintElement.setSender(adminKeypair.toSuiAddress());

    // Get gas coin for the transaction
    const coins = await client.getCoins({
      owner: adminKeypair.toSuiAddress(),
      coinType: "0x2::sui::SUI"
    });

    const gasCoin = coins.data[0];
    console.log("Using gas coin:", gasCoin.coinObjectId);

    // Set gas payment
    txMintElement.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    txMintElement.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_additional_art20`,
      arguments: [
        txMintElement.object("0xf12e9d5428241fe428f59c2b550d302d07599adf8d4f63042f954082d73b59a7"), //collection cap  it is created when mint_art20 function is called
        txMintElement.pure.u64(1), // no of nft to be minted 
        txMintElement.object("0x78ac03ae18afa19eb73ba2494a7eaeeb2b0ad9a30ecb4bda8ab669bde303954f"), // TokenIdCounter // get it from deployment
        txMintElement.object(userBalanceId), // Now using type-checked userBalanceId 
        txMintElement.object("0x6"), //clock
      ],
    });

    txMintElement.setGasBudget(200000000);

    console.log("Executing transaction...");
    const res = await client.signAndExecuteTransaction({
      transaction: txMintElement,
      signer: adminKeypair,
    });

    console.log("Transaction result:", res);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const elementNFTObjectIds = await getUserNFTs(
      client,
      adminKeypair.toSuiAddress(),
      "ART20",
    );

    for (const element of elementNFTObjectIds) {
      const objectResponse = await client.getObject({
        id: element,
        options: {
          showDisplay: true,
        },
      });
      console.log("ElementNFT object ID", element);
      console.log("ElementNFT data", objectResponse.data?.display?.data);
    }

  } catch (error) {
    console.error("Error in main:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});