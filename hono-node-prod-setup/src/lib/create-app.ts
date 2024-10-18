import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

import { pinoLogger } from "@/middlewares/logger";

import type { AppBindings } from "./types";

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
