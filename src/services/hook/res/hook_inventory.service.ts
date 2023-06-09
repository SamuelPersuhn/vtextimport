import { S3Client } from "../../../server/infra/bucket.controller";
import fs from "node:fs/promises";

const hookInventoryService = async (payload: any): Promise<void> => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
  const region = process.env.S3_REGION!;

  await fs.writeFile("./hook_inventory.json", JSON.stringify(payload, null, 2));

  const s3Client = new S3Client(accessKeyId, secretAccessKey, region);

  const s3PutRequest = s3Client.createPutPublicJsonRequest(
    "socorro-25/inventory/",
    `${new Date().toString()}.json`,
    JSON.stringify(payload)
  );

  await s3Client
    .put(s3PutRequest)
    .then((res) => {
      console.log("hook inventory --");
      return res;
    })
    .catch((err) => {
      console.log("hook inventory -- error:", err);
    });

  return;
};

export { hookInventoryService };
