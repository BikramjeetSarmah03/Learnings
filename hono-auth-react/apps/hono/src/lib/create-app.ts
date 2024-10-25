import { Hono } from "hono";
import { cors } from "hono/cors";
import { notFound, onError } from "stoker/middlewares";

export function createRouter() {
  return new Hono();
}

export default function createApp() {
  const app = createRouter();

  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
