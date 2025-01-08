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
    const userBalanceId = userBalances.data[2].data?.objectId;
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
        txMintElement.object("0x98d17f894ff66bedde3c5cca28509d32f35ca270935994ac13bd0c05f5fa12bc"), //collection cap  it is created when mint_art20 function is called
        txMintElement.pure.u64(1), // no of nft to be minted 
        txMintElement.object("0xf781a0c005c59d11bb540a1b3d916ffbf6abd0b0c241a469b702b68fd790ad92"), // TokenIdCounter // get it from deployment
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

    // const elementNFTObjectIds = await getUserNFTs(
    //   client,
    //   adminKeypair.toSuiAddress(),
    //   "ART20",
    // );

    // for (const element of elementNFTObjectIds) {
    //   const objectResponse = await client.getObject({
    //     id: element,
    //     options: {
    //       showDisplay: true,
    //     },
    //   });
    //   console.log("ElementNFT object ID", element);
    //   console.log("ElementNFT data", objectResponse.data?.display?.data);
    // }

  } catch (error) {
    console.error("Error in main:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});