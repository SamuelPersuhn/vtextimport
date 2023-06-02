import axios from "axios";
import { AppError } from "../../../errors/error";
import fs from "node:fs/promises";

const hookResService = async (orderId: string) => {
  if (!orderId) {
    return;
  }
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
  const openData = await fs.readFile("./data.json");

  const currentData = JSON.parse(openData.toString());
  currentData.push({ getOrder });

  await fs.writeFile("./data.json", JSON.stringify(currentData, null, 2));
};

export { hookResService };
