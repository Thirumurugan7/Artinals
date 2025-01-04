import "dotenv/config";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { Secp256r1Keypair } from "@mysten/sui/keypairs/secp256r1";
import { fromHex } from "@mysten/sui/utils";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui/faucet";
import type { SignatureScheme } from "@mysten/sui/cryptography";
import { SuiClient } from "@mysten/sui/client";
import { ObjectOwner } from "@mysten/sui/client";

export const CLUSTER: string = process.env.CLUSTER!;
export const PACKAGE_ADDRESS: string = process.env.PACKAGE_ADDRESS!;
export const ADMIN_CAP: string = process.env.ADMIN_CAP!;
export const MOCKED_USER_PK: string = process.env.USER_PK!;

export const getMockedUserKeypair = () => {
  return getKeypair(MOCKED_USER_PK, "ED25519");
};
export const getAdminKeypair = (curve: SignatureScheme) => {
  const privateKey = process.env.ADMIN_PK!;
  return getKeypair(privateKey, curve);
};

export const generateAndFundKeypair = async (curve: SignatureScheme) => {
  let keypair;
  switch (curve) {
    case "Secp256k1":
      keypair = Secp256k1Keypair.generate();
      break;
    case "Secp256r1":
      keypair = Secp256r1Keypair.generate();
      break;
    case "ED25519":
      keypair = Ed25519Keypair.generate();
      break;
    default:
      throw new Error("Unsupported keypair curve type");
  }

  await requestSuiFromFaucetV0({
    host: getFaucetHost(CLUSTER as "testnet" | "devnet" | "localnet"),
    recipient: keypair.toSuiAddress(),
  });

  return keypair;
};

export const getKeypair = (privateKey, curve: SignatureScheme) => {
  switch (curve) {
    case "Secp256k1":
      return Secp256k1Keypair.fromSecretKey(fromHex(privateKey));
    case "Secp256r1":
      return Secp256r1Keypair.fromSecretKey(fromHex(privateKey));
    case "ED25519":
      return Ed25519Keypair.fromSecretKey(fromHex(privateKey));
    default:
      throw new Error("Unsupported keypair curve type");
  }
};

// In your getUserNFTs function:


export async function getUserNFTs(
  client: SuiClient,
  owner: string,
  module: string
): Promise<string[]> {
  console.log(`Getting NFTs for ${owner} with module ${module}`);
  
  try {
    const objects = await client.getOwnedObjects({
      owner,
      filter: {
        StructType: `${PACKAGE_ADDRESS}::${module}::NFT`
      },
      options: { 
        showType: true,
        showContent: true,
        showOwner: true
      }
    });

    // Filter NFTs to include only those owned by the provided address
    const nftIds = objects.data
      .filter(obj => {
        const ownerData = obj.data?.owner;
        return ownerData && typeof ownerData === 'object' && 
               'AddressOwner' in ownerData && 
               ownerData.AddressOwner === owner;
      })
      .map(obj => obj.data!.objectId);

    // Log ownership details for debugging
    objects.data.forEach(obj => {
      const ownerData = obj.data?.owner;
      const ownerAddress = ownerData && typeof ownerData === 'object' && 
                          'AddressOwner' in ownerData ? 
                          ownerData.AddressOwner : 'unknown';
      console.log(`NFT ${obj.data?.objectId} owned by: ${ownerAddress}`);
    });

    console.log(`Found ${nftIds.length} NFTs owned by ${owner}:`, nftIds);
    
    return nftIds;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
}
export enum ElementType {
  Water = "Water",
  Earth = "Earth",
  Fire = "Fire",
  Air = "Air",
  Aether = "Aether",
}

export function getElementMetadata(type: ElementType) {
  const name = `${type} for Elementals by Artinals`;
  const projectUrl = "https://www.artfitoken.io/";
  const elementType: string = type;
  switch (type) {
    case ElementType.Water:
      return {
        name,
        description:
          "Symbolizes emotions, intuition, and adaptability. Water flows and adjusts, much like nature.",
          initialSupply: 5,
          maxSupply: 100, 
          uri: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water.png",
        logoUri: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/water%20mini.png",
        category: "Art",
        projectUrl,
        isMutable: true,
        hasDenyListAuthority: true,
        type: elementType,
      };
    case ElementType.Earth:
      return {
        name,
        description:
          "Represents stability, practicality, and grounding. Earth is often linked to physical reality and structure.",
        imageUrl: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/earth.png",
        thumbnailUrl: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/earth%20mini.png",
        projectUrl,
        type: elementType,
      };
    case ElementType.Fire:
      return {
        name,
        description:
          "Connected to energy, passion, and transformation. Fire represents the power of change, completion, and transformation.",
        imageUrl:
          "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/fire.png",
        thumbnailUrl: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/fire%20mini.png",
        projectUrl,
        type: elementType,
      };
    case ElementType.Air:
      return {
        name,
        description:
          "Linked to freedom, communication, and intellect. Air is associated with thoughts, ideas, and one’s dynamic and adaptable nature.",
        imageUrl:
          "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/wind.png",
        thumbnailUrl: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/wind%20mini.png",
        projectUrl,
        type: elementType,
      };
    case ElementType.Aether:
      return {
        name,
        description: "Represents unity and the source of all elements, symbolizing creation and individuality.",
        imageUrl:
          "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/aether.png",
        thumbnailUrl: "https://bafybeihhsj546mz6ejplnc35bixw24ka6e7wwxgdys6phv2r4v3ti66pri.ipfs.w3s.link/aether%20mini.png",
        projectUrl,
        type: elementType,
      };
    default:
      throw new Error("Unknown item type");
  }
}


export async function getUserNFTsByCollection(
  client: SuiClient,
  owner: string,
  module: string,
  collectionId: string
): Promise<string[]> {
  console.log(`Getting NFTs for ${owner} with module ${module} and collection ${collectionId}`);
  
  try {
    const objects = await client.getOwnedObjects({
      owner,
      filter: {
        StructType: `${PACKAGE_ADDRESS}::${module}::NFT`
      },
      options: { 
        showType: true,
        showContent: true,
        showOwner: true
      }
    });

    // Filter NFTs by collection ID
    const nftIds = objects.data
      .filter(obj => {
        const ownerData = obj.data?.owner;
        const content = obj.data?.content as any;
        return ownerData && 
               typeof ownerData === 'object' && 
               'AddressOwner' in ownerData && 
               ownerData.AddressOwner === owner &&
               content?.fields?.collection_id === collectionId;
      })
      .map(obj => obj.data!.objectId);

    console.log(`Found ${nftIds.length} NFTs for collection ${collectionId}:`, nftIds);
    
    return nftIds;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
}