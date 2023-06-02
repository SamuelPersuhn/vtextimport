import { Router } from "express";
import { createSessionController } from "../../controllers/auth/auth_user.controller";

const authApp = Router();

authApp.post("/", createSessionController);

export { authApp };
