import express, { Request, Response } from "express";
import { appRouter } from "./routes/index.routes";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use("/v1", appRouter);
app.use("/", (req: Request, res: Response) => {
  return res.send("Hello Context!");
});

const db = new PrismaClient();

export { app, db };
