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
  ElementType,
  getElementMetadata,
} from "./utils";

async function main() {
  const client = new SuiClient({
    url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
  });

  const packageAddress = PACKAGE_ADDRESS;
  const adminCap = ADMIN_CAP;

  const adminKeypair = getAdminKeypair("ED25519");
  // Use random keypair
  // const recipientKeypair = await generateAndFundKeypair("ED25519");
  // Use some static keypair
  const recipientKeypair = getMockedUserKeypair();

  console.log("Recipient address", recipientKeypair.toSuiAddress());

  const NFTMetadata = getElementMetadata(ElementType.Aether); // Change to any type

  const txMintElement = new Transaction();
  txMintElement.moveCall({
    target: `${packageAddress}::ART20::create_category`,
    arguments: [
      txMintElement.object("0x9e069015157df85830c9aacb4c9b0394f6c7320b6152fec738ae865f59a270d3"), //cateogry registry
      txMintElement.pure.string("Aether"),
      txMintElement.pure.string("Aether Element collection"),
      txMintElement.object("0x6"),
    ],
  });
  txMintElement.setGasBudget(100000000);

  await client.signAndExecuteTransaction({
    transaction: txMintElement,
    signer: adminKeypair,
  });

  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds

  const elementNFTObjectIds = await getUserNFTs(
    client,
    recipientKeypair.toSuiAddress(),
    "ART20",
  );

  elementNFTObjectIds.forEach(async (element) => {
    const objectResponse = await client.getObject({
      id: element,
      options: {
        showDisplay: true,
      },
    });
    console.log("ElementNFT object ID", element);
    console.log("ElementNFT data", objectResponse.data?.display?.data);
    console.log(
      "ElementNFT type",
      objectResponse.data?.display?.data!["element_type"],
    );
  });
}

main();