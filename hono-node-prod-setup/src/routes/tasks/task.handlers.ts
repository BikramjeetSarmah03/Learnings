import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./task.routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    {
      name: "Learn Hono",
      done: false,
    },
  ]);
};
