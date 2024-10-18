import createApp from "./lib/create-app";

const app = createApp();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.status(422);
  c.var.logger.info("WOW! Logger");
  throw new Error("Ohh No!");
});

export default app;
