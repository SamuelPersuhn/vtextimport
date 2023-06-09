import { Router } from "express";
import { getInventoryController } from "../../controllers/inventory/get_iventory.controller";
import { getWareHouseController } from "../../controllers/inventory/get_warehouse.controller";
import { getSkulistController } from "../../controllers/inventory/get_skulist.controller";
import { ensureAuthMiddleware } from "../../middlewares/auth.middleware";
import { catalogAndIventory } from "../../controllers/inventory/iventory.controller";
import { inventoryHookApp } from "./hook/inventory_hook.routes";

const catalogApp = Router();

catalogApp.get("/", ensureAuthMiddleware, getInventoryController);
catalogApp.get("/attach", catalogAndIventory);
catalogApp.get("/warehouse", ensureAuthMiddleware, getWareHouseController);
catalogApp.get("/skus", ensureAuthMiddleware, getSkulistController);

catalogApp.use("/hook", inventoryHookApp);

export { catalogApp };
