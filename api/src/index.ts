import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import "dotenv/config";
import type { Application } from "express";
import express from "express";

import appRouter from "./routes";
import { createContext } from "./trpc";

const app: Application = express();

app.use(cors());

app.use("/health", (_, res) => {
  return res.send("OK");
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server working on port: ${process.env.PORT}`);
});

export type AppRouter = typeof appRouter;
