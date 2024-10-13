import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const processEnv = EnvSchema.parse(process.env);
console.log(processEnv);

const queryClient = postgres(processEnv.DATABASE_URL);

export const db = drizzle(queryClient);
