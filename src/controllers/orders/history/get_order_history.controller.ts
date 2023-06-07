import { Request, Response } from "express";
import { AppError } from "../../../errors/error";
import { handleErrorMiddleware } from "../../../middlewares/handle_error.middleware";
import { getHistoryOrdersService } from "../../../services/orders/history/get_order_history.service";

const getHistoryOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getHistoryOrdersService(req.query);
    return res.json(orders);
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { getHistoryOrdersController };
