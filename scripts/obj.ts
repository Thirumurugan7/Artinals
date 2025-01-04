import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

async function getObjectFromAddress(address: string) {
  try {
    const client = new SuiClient({
      url: getFullnodeUrl("devnet"), // Replace with the appropriate network URL
    });

    const objectId = await client.getObjectId({
      address: address,
      coinType: "0x2::sui::SUI", // Replace with the appropriate coin type if needed
    });

    if (!objectId) {
      console.log("No object found for the given address.");
      return;
    }

    const object = await client.getObject({
      id: objectId,
      options: { showContent: true },
    });

    console.log("Object:", object);
  } catch (error) {
    console.error("Error retrieving object:", error);
  }
}

// Usage
const address = "0xd001f2c15bee14d18acb25985ecdc939acf239455312b51e318a60b66bdaded8";
getObjectFromAddress(address);