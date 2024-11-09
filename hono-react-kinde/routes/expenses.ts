import { Hono } from "hono";

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: [],
    });
  })
  .post("/", (c) => {
    return c.json({
      expense: {},
    });
  });
//   .delete("/")
//   .put("/");
