import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
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
    const coins1 = await client.getCoins({
      owner: adminKeypair.toSuiAddress()    });


    console.log("coins",coins.data);
    console.log("coins",coins1.data);
    
    if (coins.data.length < 1) {
      throw new Error("Need at least 2 SUI coins for gas and fee payment");
    }

    const gasCoin = coins.data[0];
    // const feeCoin = coins1.data[1];  // Using second coin for fee payment
    console.log("Using gas coin:", gasCoin.coinObjectId);
    // console.log("Using fee coin:", feeCoin.coinObjectId);

    const txMintElement = new Transaction();

    // Set the sender address
    txMintElement.setSender(adminKeypair.toSuiAddress());
    
    // // Set gas coin with proper object structure
    txMintElement.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    txMintElement.moveCall({
      target: `${PACKAGE_ADDRESS}::ART20::mint_art20`,
      typeArguments: ["0xa6bb9e053fd0d03afa99945c35a40953e0b30f986d451be005a860fcd171d60e::artfi::ARTFI"],
      arguments: [
        txMintElement.pure.string("Water Collection"), // name
        txMintElement.pure.string("Symbolizes emotions, intuition, and adaptability. Water flows and adjusts, much like nature."), //description
        txMintElement.pure.u64(0), //initial supply
        txMintElement.pure.u64(0), //max suppy
        txMintElement.pure.string("https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water.png"), //uri
        txMintElement.pure.string("https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water%20mini.png"), //logo uri
        txMintElement.pure.string("Water"), //collection name, first call create collecrion function to create a colelction
        txMintElement.object("0x9e069015157df85830c9aacb4c9b0394f6c7320b6152fec738ae865f59a270d3"), // category registry from deployment
        txMintElement.pure.bool(true), // ismutable
        txMintElement.pure.bool(true), // has_deny_list_authority
        txMintElement.object("0x78ac03ae18afa19eb73ba2494a7eaeeb2b0ad9a30ecb4bda8ab669bde303954f"), // tokenId counter from deployment
        txMintElement.object("0x60a341eac61baf6d9571011ad497fac7c75a1b09e096cdfd5b9a74505c64bca1"), //fee config from deployment
        txMintElement.object("0x8f98907ff692d86ebd33ac5822c39c9aeb1994aee655582c75081f12c36d7faa"),  // Using different coin for fee payment 
        txMintElement.object("0x6") //clock
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