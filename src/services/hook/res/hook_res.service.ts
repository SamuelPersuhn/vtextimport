import axios from "axios";
import { AppError } from "../../../errors/error";
import "dotenv/config";
import { S3Client } from "../../../server/infra/bucket.controller";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.S3_REGION!;
const Bucket = process.env.S3_BUCKET;

const hookResService = async (orderId: string) => {
  if (!orderId) {
    return;
  }
  console.log("Order hook received");

  const getOrder = await axios
    .get(
      `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/oms/pvt/orders/${orderId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-VTEX-API-AppKey": process.env.VTEX_KEY,
          "X-VTEX-API-AppToken": process.env.VTEX_TOKEN,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new AppError(err.response.data, 400);
    });

  const s3Client = new S3Client(accessKeyId, secretAccessKey, region);

  const s3PutRequest = s3Client.createPutPublicJsonRequest(
    "socorro-25",
    `${new Date().toString()}-${orderId}-${Math.random().toString()}.json`,
    JSON.stringify(getOrder)
  );

  await s3Client
    .put(s3PutRequest)
    .then((res) => {
      console.log("order hook - s3 builded");
      return res;
    })
    .catch((err) => {
      console.log("desiste", err);
      return err;
    });
};

export { hookResService };
