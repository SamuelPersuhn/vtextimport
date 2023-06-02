import { Request, Response } from "express";
import fs from "node:fs/promises";

const getWareHouseController = async (req: Request, res: Response) => {
  const openFile = await fs.readFile("./warehouses.json");
  const parseData = JSON.parse(openFile.toString());
  return res.json(parseData).send();
};

export { getWareHouseController };
