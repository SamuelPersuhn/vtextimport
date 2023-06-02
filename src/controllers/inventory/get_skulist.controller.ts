import { Request, Response } from "express";
import fs from "node:fs/promises";

const getSkulistController = async (req: Request, res: Response) => {
  const openFile = await fs.readFile("./skulist.json");
  const parseData = JSON.parse(openFile.toString());
  return res.json(parseData).send();
};

export { getSkulistController };
