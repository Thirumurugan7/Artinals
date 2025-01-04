import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { bcs } from "@mysten/sui/bcs";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  ADMIN_CAP,
  generateAndFundKeypair,
  getMockedUserKeypair,
  getAdminKeypair,
  getUserNFTs,
} from "./utils";

async function main() {
  try {
    const client = new SuiClient({
      url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
    });
    console.log("client", client);

    const adminKeypair = getAdminKeypair("ED25519");
    const recipientKeypair = getMockedUserKeypair();

    console.log("Recipient address", recipientKeypair.toSuiAddress());

    // Get all gas objects first
    const coins = await client.getCoins({
      owner: adminKeypair.toSuiAddress(),
      coinType: "0x2::sui::SUI"
    });
    
    if (coins.data.length < 1) {
      throw new Error("Need at least 1 SUI coin for gas payment");
    }

    const gasCoin = coins.data[0];
    console.log("Using gas coin:", gasCoin.coinObjectId);

    const txMintElement = new Transaction();

    // Set the sender address
    txMintElement.setSender(adminKeypair.toSuiAddress());
    
    // Set gas coin with proper object structure
    txMintElement.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    // Create zero coin for fee
    const zeroCoin = txMintElement.moveCall({
      target: "0x2::coin::zero",
      typeArguments: ["0xa6bb9e053fd0d03afa99945c35a40953e0b30f986d451be005a860fcd171d60e::artfi::ARTFI"],
    });

    // Main mint call with correct BCS serialization
    txMintElement.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_art20`,
      typeArguments: ["0xa6bb9e053fd0d03afa99945c35a40953e0b30f986d451be005a860fcd171d60e::artfi::ARTFI"],
      arguments: [
        txMintElement.pure.string("Fire"),
        txMintElement.pure.string("Symbolizes emotions, intuition, and adaptability. Water flows and adjusts, much like nature."),
        txMintElement.pure.u64("0"),
        txMintElement.pure.u64("0"),
        txMintElement.pure.string("https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water.png"),
        txMintElement.pure.string("https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water%20mini.png"),
        txMintElement.pure.string("Fire"),
        txMintElement.object("0x957f7a60a0c41aa9eb4d2f253fdbf0d4b6b72701bfa06975597c94f124478733"),
        txMintElement.pure.bool(true),
        txMintElement.pure.bool(false),
        txMintElement.object("0xc8f12179e66acbe980b393de79855455d80a13189a96457cc6d76a3ab2557de4"),
        txMintElement.object("0x8f98907ff692d86ebd33ac5822c39c9aeb1994aee655582c75081f12c36d7faa"),
        zeroCoin,
        txMintElement.object("0x6")
      ],
    });

    txMintElement.setGasBudget(500000000);

    console.log("Executing transaction...");
    const res = await client.signAndExecuteTransaction({
      transaction: txMintElement,
      signer: adminKeypair,
    });

    console.log("Transaction result:", res);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Fetching NFTs...");
    const elementNFTObjectIds = await getUserNFTs(
      client,
      recipientKeypair.toSuiAddress(),
      "ART20",
    );

    console.log("Processing NFT data...");
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