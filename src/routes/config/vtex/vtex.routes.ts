import { Request, Response, Router } from "express";
import { hookResController } from "../../../controllers/hook/res/hook_res.controller";
import { hookDatabaseController } from "../../../controllers/hook/res/hook_database.controller";
import { ensureAuthMiddleware } from "../../../middlewares/auth.middleware";

const vtexApp = Router();

vtexApp.post("/", hookResController);
vtexApp.get("/", ensureAuthMiddleware, hookDatabaseController);

export { vtexApp };
