import { Request, Response } from "express";
import { hookInventoryService } from "../../../services/hook/res/hook_inventory.service";
import { AppError } from "../../../errors/error";
import { handleErrorMiddleware } from "../../../middlewares/handle_error.middleware";

const hookInventoryController = async (req: Request, res: Response) => {
  try {
    await hookInventoryService(req.body);
    return res.status(200).send();
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { hookInventoryController };
