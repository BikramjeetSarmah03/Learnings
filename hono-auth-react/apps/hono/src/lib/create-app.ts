import { Hono } from "hono";
import { notFound, onError } from "stoker/middlewares";

export function createRouter() {
  return new Hono();
}

export default function createApp() {
  const app = createRouter();

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
