import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import {
  CLUSTER,
  PACKAGE_ADDRESS,
  getAdminKeypair,
  getMockedUserKeypair,
  getUserNFTs,
} from "./utils";

async function main() {
  const client = new SuiClient({
    url: getFullnodeUrl(CLUSTER as "testnet" | "devnet" | "localnet"),
  });

  const packageAddress = PACKAGE_ADDRESS;

  const adminKeypair = getAdminKeypair("ED25519");
  const mockedUser = getMockedUserKeypair();
  console.log("User address", mockedUser.toSuiAddress());

  const order = ["Aether", "Air", "Fire", "Earth", "Water"];
  const elementNFTObjectIds = await getUserNFTs(
    client,
    mockedUser.toSuiAddress(),
    "ElementNFT",
  );
  const userElementNFTs = await client.multiGetObjects({
    ids: elementNFTObjectIds,
    options: {
      showContent: true,
    },
  });
  const NFTs = userElementNFTs.map((obj: any) => ({
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
      txMintAvatar.pure.address(mockedUser.toSuiAddress()),
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
  tx.setSender(mockedUser.getPublicKey().toSuiAddress());
  tx.setGasOwner(adminKeypair.getPublicKey().toSuiAddress());
  tx.setGasBudget(1000000000);
  // signing tx
  const sponsoredTx = await adminKeypair.signTransaction(
    await tx.build({ client: client }),
  );
  const signedTx = await mockedUser.signTransaction(
    await Transaction.from(sponsoredTx.bytes).build({ client: client }),
  );

  await client.executeTransactionBlock({
    transactionBlock: signedTx.bytes,
    signature: [signedTx.signature, sponsoredTx.signature],
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds
  
  const userAvatars = await getUserNFTs(
    client,
    mockedUser.toSuiAddress(),
    "AvatarNFT",
  );

  userAvatars.forEach(async (avatar) => {
    const objectResponse = await client.getObject({
      id: avatar,
      options: {
        showDisplay: true,
      },
    });
    console.log("AvatarNFT object ID", avatar);
    console.log("AvatarNFT data", objectResponse.data?.display?.data);
  });
}

main();
