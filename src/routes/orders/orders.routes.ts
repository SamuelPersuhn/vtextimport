import { Router } from "express";
import { orderHistoryApp } from "./history/order_history.routes";

const ordersApp = Router();

ordersApp.use("/history", orderHistoryApp);

export { ordersApp };
