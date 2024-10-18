import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { notFound, onError } from "stoker/middlewares";

const app = new OpenAPIHono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
