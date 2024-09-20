import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../api/src/index";

export const trpc = createTRPCReact<AppRouter>();
