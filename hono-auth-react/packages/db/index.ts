import { drizzle } from "drizzle-orm/libsql";

import env from "@packages/env";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
