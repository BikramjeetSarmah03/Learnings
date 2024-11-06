import type { AppType } from "../app";
import { hc } from "hono/client";

const apiClient = hc<AppType>("http://localhost:3000");

console.log({ apiClient });
