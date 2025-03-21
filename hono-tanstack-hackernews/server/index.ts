import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import type { ErrorResponse } from "@/shared/types";

import type { Context } from "./context";
import { lucia } from "./lucia";
import { authRouter } from "./routes/auth.routes";
import { commentsRouter } from "./routes/comments.routes";
import { postRouter } from "./routes/posts.routes";

const app = new Hono<Context>();

app.use("*", cors(), async (c, next) => {
  const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set("session", session);
  c.set("user", user);
  return next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .basePath("/api/v1/")
  .route("/auth", authRouter)
  .route("/posts", postRouter)
  .route("/comments", commentsRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json<ErrorResponse>({
        success: false,
        error: err.message,
        isFormError:
          err.cause && typeof err.cause === "object" && "form" in err.cause
            ? err.cause.form === true
            : false,
      });

    return errResponse;
  }

  return c.json<ErrorResponse>({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : (err.stack ?? err.message),
  });
});

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default {
  port: process.env["PORT"] || 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};

console.log("Server Running on port: ", process.env["PORT"] || 3000);
export type ApiRoutes = typeof routes;
