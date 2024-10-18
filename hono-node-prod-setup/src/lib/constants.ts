import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { HttpStatusPhrases } from "./types";

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND
);
