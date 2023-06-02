import { Request, Response } from "express";
import { AppError } from "../../errors/error";
import { handleErrorMiddleware } from "../../middlewares/handle_error.middleware";
import { createSessionClientService } from "../../services/auth/auth_user.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const token = await createSessionClientService(req.body);
    return res.status(200).json({ token: token });
  } catch (error) {
    if (error instanceof AppError) {
      handleErrorMiddleware(error, res);
    }
  }
};

export { createSessionController };
