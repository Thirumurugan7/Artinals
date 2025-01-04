import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { assert } from "chai";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  ADMIN_CAP,
  generateAndFundKeypair,
  getAdminKeypair,
  ElementType,
  getElementMetadata,
} from "./utils";

async function main() {
  const client = new SuiClient({
    url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
  });

  console.log("client",client);
  

  const packageAddress = PACKAGE_ADDRESS;
  const adminCap = ADMIN_CAP;

  const adminKeypair = getAdminKeypair("ED25519");
  const userKeypair = await generateAndFundKeypair("ED25519");
  console.log("User address", userKeypair.toSuiAddress());
  console.log("adminKeypair address", adminKeypair.toSuiAddress());


  const waterMetadata = getElementMetadata(ElementType.Water);
  const earthMetadata = getElementMetadata(ElementType.Earth);
  const fireMetadata = getElementMetadata(ElementType.Fire);
  const airMetadata = getElementMetadata(ElementType.Air);
  const aetherMetadata = getElementMetadata(ElementType.Aether);

  const txMintElement = new Transaction();
  txMintElement.moveCall({
    target: `${packageAddress}::elementals::mint_element`,
    arguments: [
      txMintElement.object(adminCap),
      txMintElement.pure.address(userKeypair.toSuiAddress()),
      txMintElement.pure.string(waterMetadata.name),
      txMintElement.pure.string(waterMetadata.description),
      txMintElement.pure.string(waterMetadata.imageUrl),
      txMintElement.pure.string(waterMetadata.thumbnailUrl),
      txMintElement.pure.string(waterMetadata.projectUrl),
      txMintElement.pure.string(waterMetadata.type),
    ],
  });
  txMintElement.moveCall({
    target: `${packageAddress}::elementals::mint_element`,
    arguments: [
      txMintElement.object(adminCap),
      txMintElement.pure.address(userKeypair.toSuiAddress()),
      txMintElement.pure.string(earthMetadata.name),
      txMintElement.pure.string(earthMetadata.description),
      txMintElement.pure.string(earthMetadata.imageUrl),
      txMintElement.pure.string(earthMetadata.thumbnailUrl),
      txMintElement.pure.string(earthMetadata.projectUrl),
      txMintElement.pure.string(earthMetadata.type),
    ],
  });
  txMintElement.moveCall({
    target: `${packageAddress}::elementals::mint_element`,
    arguments: [
      txMintElement.object(adminCap),
      txMintElement.pure.address(userKeypair.toSuiAddress()),
      txMintElement.pure.string(fireMetadata.name),
      txMintElement.pure.string(fireMetadata.description),
      txMintElement.pure.string(fireMetadata.imageUrl),
      txMintElement.pure.string(fireMetadata.thumbnailUrl),
      txMintElement.pure.string(fireMetadata.projectUrl),
      txMintElement.pure.string(fireMetadata.type),
    ],
  });
  txMintElement.moveCall({
    target: `${packageAddress}::elementals::mint_element`,
    arguments: [
      txMintElement.object(adminCap),
      txMintElement.pure.address(userKeypair.toSuiAddress()),
      txMintElement.pure.string(airMetadata.name),
      txMintElement.pure.string(airMetadata.description),
      txMintElement.pure.string(airMetadata.imageUrl),
      txMintElement.pure.string(airMetadata.thumbnailUrl),
      txMintElement.pure.string(airMetadata.projectUrl),
      txMintElement.pure.string(airMetadata.type),
    ],
  });
  txMintElement.moveCall({
    target: `${packageAddress}::elementals::mint_element`,
    arguments: [
      txMintElement.object(adminCap),
      txMintElement.pure.address(userKeypair.toSuiAddress()),
      txMintElement.pure.string(aetherMetadata.name),
      txMintElement.pure.string(aetherMetadata.description),
      txMintElement.pure.string(aetherMetadata.imageUrl),
      txMintElement.pure.string(aetherMetadata.thumbnailUrl),
      txMintElement.pure.string(aetherMetadata.projectUrl),
      txMintElement.pure.string(aetherMetadata.type),
    ],
  });
  txMintElement.setGasBudget(1000000000);

  const responseElements = await client.signAndExecuteTransaction({
    transaction: txMintElement,
    signer: adminKeypair,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds.

  const order = ["Aether", "Air", "Fire", "Earth", "Water"];
  const createdObjectIds: string[] = responseElements
    .objectChanges!.filter((obj: any) => obj.type === "created")
    .map((obj: any) => obj.objectId);
  const objects = await client.multiGetObjects({
    ids: createdObjectIds,
    options: {
      showContent: true,
    },
  });
  const NFTs = objects.map((obj: any) => ({
    objectId: obj.data.objectId,
    element_type: obj.data.content.fields.element_type,
  }));
  const sortedNFTs = NFTs.sort(
    (a, b) => order.indexOf(a.element_type) - order.indexOf(b.element_type),
  );
  const sortedNFTsAddresses = sortedNFTs.map((obj) => obj.objectId);

  const txMintAvatar = new Transaction();
  const NFTsVector = txMintAvatar.makeMoveVec({
    elements: sortedNFTsAddresses,
    type: `${packageAddress}::elementals::ElementNFT`,
  });
  txMintAvatar.moveCall({
    target: `${packageAddress}::elementals::mint_avatar`,
    arguments: [
      NFTsVector,
      txMintAvatar.pure.address(userKeypair.toSuiAddress()),
    ],
  });
  // build the transaction
  const kindBytes = await txMintAvatar.build({
    client,
    onlyTransactionKind: true,
  });
  // construct a sponsored transaction from the kind bytes
  const tx = Transaction.fromKind(kindBytes);
  // you can now set the sponsored transaction data that is required
  tx.setSender(userKeypair.getPublicKey().toSuiAddress());
  tx.setGasOwner(adminKeypair.getPublicKey().toSuiAddress());
  tx.setGasBudget(1000000000);
  // signing tx
  const sponsoredTx = await adminKeypair.signTransaction(
    await tx.build({ client: client }),
  );
  const signedTx = await userKeypair.signTransaction(
    await Transaction.from(sponsoredTx.bytes).build({ client: client }),
  );

  const responseAvatar = await client.executeTransactionBlock({
    transactionBlock: signedTx.bytes,
    signature: [signedTx.signature, sponsoredTx.signature],
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });

  assert(responseAvatar.effects?.status.status == "success");
  console.log("Avatar NFT successfully created. Tx response", responseAvatar);
}

main();
