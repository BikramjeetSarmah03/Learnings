import { NextRequest, NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";
import { Session } from "@apps/hono/src/lib/types";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: "http://localhost:3000",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
