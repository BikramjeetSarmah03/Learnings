import { publicProcedure, router } from "./trpc";

const appRouter = router({
  test: publicProcedure.query(() => {
    return "Hello World 123";
  }),
});

export default appRouter;
