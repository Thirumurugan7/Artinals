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
      typeArguments: ["0x706fa7723231e13e8d37dad56da55c027f3163094aa31c867ca254ba0e0dc79f::artfi::ARTFI"],
    });


    console.log("zerocoin", zeroCoin)
    // Main mint call with correct BCS serialization
    txMintElement.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_art20`,
      typeArguments: ["0x706fa7723231e13e8d37dad56da55c027f3163094aa31c867ca254ba0e0dc79f::artfi::ARTFI"],
      arguments: [
        txMintElement.pure.string("Aether Element"),
        txMintElement.pure.string("Represents unity and the source of all elements, symbolizing creation and individuality."),
        txMintElement.pure.u64("0"),
        txMintElement.pure.u64("0"),
        txMintElement.pure.string("https://www.artfitoken.io"),
        txMintElement.pure.string("https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/aether.png"),
        txMintElement.pure.string("Aether"),
        
        txMintElement.object("0x892677b7488b09254718bee0816fe843483d67c3097a71d47288a7896f2cd398"), //category registry
        txMintElement.pure.bool(true),
        txMintElement.pure.bool(true),
        txMintElement.object("0xf781a0c005c59d11bb540a1b3d916ffbf6abd0b0c241a469b702b68fd790ad92"), // tokenId counter from deployment
        txMintElement.object("0xb88c99b9e703b09452dff057ee8d008e8d463e328ed9bdcc38f4d18ec4545630"), //fee config from deployment
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