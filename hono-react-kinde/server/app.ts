import { Hono } from "hono";

import { expensesRoutes } from "./routes/expenses";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hey working..." });
});

app.route("/api/expenses", expensesRoutes);

export default app;
