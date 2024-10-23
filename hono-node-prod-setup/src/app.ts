import { configureOpenAPI } from "@/lib/configure-openapi";
import createApp from "@/lib/create-app";

import index from "@/routes/index.routes";
import tasks from "@/routes/tasks/tasks.index";

const app = createApp();

const routes = [index, tasks] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
