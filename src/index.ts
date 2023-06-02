import cluster from "node:cluster";
import os from "node:os";
import { app } from "./app";

const cpus = os.cpus();
const port = process.env.PORT || 8000;
const onWorkerError = (code: any, signal: any) => console.log(code, signal);

if (cluster.isPrimary) {
  cpus.map(() => {
    const worker = cluster.fork();
    worker.on("error", onWorkerError);
  });
  cluster.on("exit", (_) => {
    const worker = cluster.fork();
    worker.on("error", onWorkerError);
    console.log("A new worker rises", worker.process.pid);
  });
  cluster.on("exit", (err) => console.log(err));
} else {
  app.listen(port, () => {
    console.log(`Server runing at port: ${port} <pid: ${process.pid}>`);
  });
  app.on("error", (err) => console.log(err));
}
