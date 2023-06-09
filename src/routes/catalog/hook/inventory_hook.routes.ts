import { Router } from "express";
import { hookInventoryController } from "../../../controllers/hook/res/hook_inventory.controller";
import { ensureAuthMiddleware } from "../../../middlewares/auth.middleware";
import { getHookLogInventoryController } from "../../../controllers/inventory/hook_inventory.controller";

const inventoryHookApp = Router();

inventoryHookApp.post("/", hookInventoryController);
inventoryHookApp.get("/", ensureAuthMiddleware, getHookLogInventoryController);

export { inventoryHookApp };
