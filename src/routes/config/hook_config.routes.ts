import { Router } from "express";
import { hookConfigController } from "../../controllers/hook/config/hook_config.controller";
import { vtexApp } from "./vtex/vtex.routes";

const hookApp = Router();

hookApp.get("/config", hookConfigController);

hookApp.use("/vtex", vtexApp);

export { hookApp };
