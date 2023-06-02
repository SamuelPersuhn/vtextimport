import axios from "axios";
import { AppError } from "../../errors/error";
import fs from "node:fs/promises";

const getCatalogService = async () => {
  const catalog = await axios
    .get(
      `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/catalog_system/pvt/products/GetProductAndSkuIds`,
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

  await fs.writeFile("./catalog.json", JSON.stringify(catalog, null, 2));

  return catalog;
};

export { getCatalogService };
