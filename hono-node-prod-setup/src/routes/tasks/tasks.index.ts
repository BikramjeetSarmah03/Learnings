import { createRouter } from "@/lib/create-app";

import * as handlers from "./task.handlers";
import * as routes from "./task.routes";

const router = createRouter().openapi(routes.list, handlers.list);

export default router;
