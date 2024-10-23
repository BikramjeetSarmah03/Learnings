import createApp from "@/lib/create-app";

import index from "@/routes/index.routes";

const app = createApp();

const routes = [index] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
