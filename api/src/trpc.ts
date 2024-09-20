import { initTRPC, type inferAsyncReturnType } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import SuperJSON from "superjson";

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions) => ({});
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure;
