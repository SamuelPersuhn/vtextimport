import axios from "axios";
import { AppError } from "../../../errors/error";
import fs from "node:fs/promises";

const stackSkusListService = async (): Promise<Array<number>> => {
  let page: number = 1,
    pageSize: number = 1000,
    chunks: Array<number> = [];

  for (let i: number = 0; i < page; i++) {
    const response: number[] = await axios
      .get(
        `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/catalog_system/pvt/sku/stockkeepingunitids?page=${page}&pagesize=${pageSize}`,
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
    page++;
    if (response.length < pageSize) {
      break;
    }
  }
  await fs.writeFile("./skulist.json", JSON.stringify(chunks, null, 2));
  return chunks;
};

export { stackSkusListService };
