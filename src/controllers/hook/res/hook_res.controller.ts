import { Request, Response } from "express";
import { hookResService } from "../../../services/hook/res/hook_res.service";
import { AppError } from "../../../errors/error";
import { handleErrorMiddleware } from "../../../middlewares/handle_error.middleware";

interface IFromWorkerHook {
  Domain: string;
  OrderId: string;
  State: string;
  LastChange: string;
  CurrentChange: string;
  Origin: { Account: string; key: string };
}

const hookResController = async (req: Request, res: Response) => {
  console.log("hook ping", {req})
  try {
    const { OrderId }: IFromWorkerHook = req.body;
    await hookResService(OrderId);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { hookResController };
