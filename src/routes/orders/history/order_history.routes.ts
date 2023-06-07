import { Router } from "express";
import { getHistoryOrdersController } from "../../../controllers/orders/history/get_order_history.controller";

const orderHistoryApp = Router();

orderHistoryApp.get("/", getHistoryOrdersController);

export { orderHistoryApp };
