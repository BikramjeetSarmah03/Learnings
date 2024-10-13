import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import type { ErrorResponse } from "@/shared/types";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

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

export default app;
