import axios from "axios";
import { AppError } from "../../../errors/error";
import { S3Client } from "../../../server/infra/bucket.controller";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.S3_REGION!;

const getHistoryOrdersService = async ({
  initial_date = new Date("01/01/2019").toISOString(),
}: qs.ParsedQs) => {
  if (typeof initial_date !== "string") {
    throw new AppError(
      `o parâmetro <${initial_date}> precisa ser do tipo string`,
      400
    );
  }

  const s3Client = new S3Client(accessKeyId, secretAccessKey, region);

  const finalDateSearchUrl = encodeURIComponent(
    ` ${new Date().toISOString()}]`
  );

  let page: number = 1;

  const getAmoutOfPages = await axios
    .get(
      `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/oms/pvt/orders?orderBy=creationDate%2C%20asc&page=${page}&per_page=100&f_creationDate=creationDate%3A%5B2019-01-01T02%3A00%3A00.000Z%20TO${finalDateSearchUrl}&utc=-2000&incompleteOrders=true`,
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

  console.log(getAmoutOfPages.paging.total);

  for (let i: number = 0; i < getAmoutOfPages.paging.total; i++) {
    const orderHistory = await axios
      .get(
        `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/oms/pvt/orders?orderBy=creationDate%2C%20asc&page=${page}&per_page=100&f_creationDate=creationDate%3A%5B2019-01-01T02%3A00%3A00.000Z%20TO${finalDateSearchUrl}&utc=-2000&incompleteOrders=true`,
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

    page++;
    for (let x: number = 0; x < orderHistory.list.length; x++) {
      const s3PutRequest = s3Client.createPutPublicJsonRequest(
        "socorro-25",
        `${new Date().toString()}-${orderHistory.list[0].orderId}.json`,
        JSON.stringify(orderHistory.list[x])
      );
      await s3Client
        .put(s3PutRequest)
        .then((res) => {
          console.log("deus e mais", res);
          return res;
        })
        .catch((err) => {
          console.log("desiste", err);
        });
    }
  }
};

export { getHistoryOrdersService };
