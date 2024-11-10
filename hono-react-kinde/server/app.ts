import { Hono } from "hono";

import { expensesRoutes } from "./routes/expenses";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hey working..." });
});

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoutes);

export default app;

export type ApiTypes = typeof apiRoutes;
