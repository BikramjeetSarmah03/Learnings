import { createRoute, z } from "@hono/zod-openapi";

import { jsonContent } from "stoker/openapi/helpers";

import { HttpStatusCodes } from "@/lib/types";
import { selectTasksSchema } from "@/db/schema";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The list of tasks"
    ),
  },
});

export type ListRoute = typeof list;
