import axios from "axios";
import { AppError } from "../../../errors/error";
import fs from "node:fs/promises";

interface IWareHouse {
  id: string;
  name: string;
  warehouseDocks: IDock[];
  pickupPointIds: [];
  priority: number;
  isActive: boolean;
}

interface IDock {
  dockId: string;
  time: string;
  cost: number;
}

const getWareHousesService = async (): Promise<IWareHouse[]> => {
  const warehouses: IWareHouse[] = await axios
    .get(
      `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/logistics/pvt/configuration/warehouses`,
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

  await fs.writeFile("./warehouses.json", JSON.stringify(warehouses, null, 2));

  return warehouses;
};

export { getWareHousesService };
