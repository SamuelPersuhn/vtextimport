import { Request, Response } from "express";
import axios from "axios";
import "dotenv/config";
import { AppError } from "../../../errors/error";
import { handleErrorMiddleware } from "../../../middlewares/handle_error.middleware";

const hookConfigController = async (req: Request, res: Response) => {
  const HOOK_OPTIONS = JSON.stringify({
    filter: {
      type: "FromWorkflow",
      status: [
        "order-completed",
        "ready-for-handling",
        "start-handling",
        "handling",
        "waiting-ffmt-authorization",
        "cancel",
      ],
    },
    queue: {
      visibilityTimeoutInSeconds: 240,
      messageRetentionPeriodInSeconds: 345600,
    },
    quantity: 1261,
    aproximateAgeOfOldestMessageInSeconds: 1113.349305555555,
    hook: {
      url: `${process.env.BASE_URL}/${process.env.ENTRYPOINT}`,
      headers: {
        key: "teste",
      },
    },
  });
  try {
    const hookJSON = await axios
      .post(
        `https://${process.env.VTEX_ACCOUNT}.${process.env.VTEX_ENVIRONMENT}.com.br/api/orders/hook/config`,
        HOOK_OPTIONS,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": process.env.VTEX_KEY,
            "X-VTEX-API-AppToken": process.env.VTEX_TOKEN,
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new AppError(err.response.data, 400);
      });
    return res.json(hookJSON);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { hookConfigController };
