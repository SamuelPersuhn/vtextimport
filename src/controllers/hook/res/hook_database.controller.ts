import { Request, Response } from "express";
import fs from "node:fs/promises";

const hookDatabaseController = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("./data.json");
    const parseData = JSON.parse(data.toString());
    return res.json(parseData).send();
  } catch (error) {}
};

export { hookDatabaseController };
