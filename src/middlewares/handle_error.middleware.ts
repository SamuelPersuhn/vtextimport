import { Response } from "express";
import { AppError } from "../errors/error";

const handleErrorMiddleware = async (error: any, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error", error });
};

export { handleErrorMiddleware };
