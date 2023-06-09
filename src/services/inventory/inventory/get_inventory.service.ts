import axios from "axios";
import { AppError } from "../../../errors/error";
import fs from "node:fs/promises";

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
): Promise<IListInventory[]> => {
  let chunks: IListInventory[] = [];

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
        throw new AppError(err, 400);
      });
    chunks = [...chunks, ...response];
  }
  await fs.writeFile("./inventory.json", JSON.stringify(chunks, null, 2));
  return chunks;
};

export { getInventoryService };
