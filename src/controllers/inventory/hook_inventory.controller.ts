import { Request, Response } from "express";
import { getLogHookInventoryService } from "../../services/inventory/inventory/get_log_hook_inventory.service";

const getHookLogInventoryController = async (req: Request, res: Response) => {
  const data = await getLogHookInventoryService();
  return res.json(data).send();
};

export { getHookLogInventoryController };
