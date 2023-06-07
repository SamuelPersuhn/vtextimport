import { Router } from "express";
import { hookApp } from "./config/hook_config.routes";
import { authApp } from "./auth/auth.routes";
import { catalogApp } from "./catalog/catalog.routes";
import { ordersApp } from "./orders/orders.routes";

const appRouter = Router();

appRouter.use("/hook", hookApp);
appRouter.use("/auth", authApp);
appRouter.use("/orders", ordersApp);
appRouter.use("/inventory", catalogApp);

export { appRouter };
