import { auth } from "./auth";

export interface AppBindings {
  Variables: {};
}

export * as HttpStatusCodes from "stoker/http-status-codes";
export * as HttpStatusPhrases from "stoker/http-status-phrases";

export type Session = typeof auth.$Infer.Session;
