import axios from "axios";
import { AppError } from "../../../errors/error";
import fs from "node:fs/promises";
import { S3Client } from "../../../server/infra/bucket.controller";

interface IListInventory {
  skuId: string;
  warehouseId: string;
  dockId: string;
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  isUnlimited: boolean;
  salesChannel: string[];
  deliveryChannels: string[];
  timeToRefill: string | null;
  dateOfSupplyUtc: string | null;
  supplyLotId: string | null;
  keepSellingAfterExpiration: boolean;
  transfer: string | null;
}

const getInventoryService = async (
  skus: Array<number>,
  warehouse: string
): Promise<void> => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
  const region = process.env.S3_REGION!;

  for (let i: number = 0; i < skus.length; i++) {
    const response: IListInventory[] = await axios
      .get(
        `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/logistics/pvt/inventory/items/${skus[i]}/warehouses/${warehouse}`,
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
      "socorro-25/inventory",
      `${new Date().toString()}-${skus[i]}-${Math.random().toString()}.json`,
      JSON.stringify(response[0])
    );

    await s3Client
      .put(s3PutRequest)
      .then((res) => {
        console.log("INVENTORY - s3 builded");
        return res;
      })
      .catch((err) => {
        console.log("desiste", err);
        return err;
      });
  }
};

export { getInventoryService };
