import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./task.routes";
import db from "@/db";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};
