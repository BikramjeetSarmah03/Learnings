import createApp from "@/lib/create-app";

import index from "@/routes/index.routes";
import auth from "@/routes/auth.routes";

const app = createApp();

const routes = [index, auth] as const;

routes.forEach((route) => {
  app.route("/api/", route);
});

export type AppType = (typeof routes)[number];

export default app;
