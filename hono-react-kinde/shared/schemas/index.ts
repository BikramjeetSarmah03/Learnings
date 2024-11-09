import { z } from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string(),
  amount: z.number(),
});

export const createExpenseSchema = expenseSchema.omit({
  id: true,
});

export type Expense = z.infer<typeof expenseSchema>;
