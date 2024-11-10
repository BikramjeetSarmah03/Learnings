import { hc } from "hono/client";

import type { ApiTypes } from "@server/app";

export const apiClient = hc<ApiTypes>("/").api;
