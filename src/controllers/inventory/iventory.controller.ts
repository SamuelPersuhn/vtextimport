import { stackSkusListService } from "../../services/inventory/skus/stack_sku_list.service";
import { getInventoryService } from "../../services/inventory/inventory/get_inventory.service";
import { getWareHousesService } from "../../services/inventory/warehouses/get_warehouses.service";
import { Request, Response } from "express";

const catalogAndIventory = async (req: Request, res: Response) => {
  res.status(200).send();
  console.log("Inventory list run!");
  const warehouse = await getWareHousesService();
  const skus = await stackSkusListService();
  const inventory = await getInventoryService(skus, warehouse[0].id);
  if (inventory.length >= skus.length) {
    console.log("Inventory updated!");
    return;
  }
  return;
};

export { catalogAndIventory };
