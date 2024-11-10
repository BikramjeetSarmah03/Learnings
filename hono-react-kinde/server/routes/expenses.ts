import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createExpenseSchema } from "../..//shared/schemas";
import { expenses } from "../../shared/data/fake";

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: expenses,
    });
  })
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const data = c.req.valid("json");

    expenses.push({ ...data, id: expenses.length + 1 });

    return c.json({
      expense: {},
    });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = expenses.find((exp) => exp.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = expenses.findIndex((exp) => exp.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = expenses.splice(index, 1)[0];

    return c.json({ expense: deletedExpense });
  });
