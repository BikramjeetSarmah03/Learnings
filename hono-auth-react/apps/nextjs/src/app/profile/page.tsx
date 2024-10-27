import { betterFetch } from "@better-fetch/fetch";
import { headers } from "next/headers";

import { Session } from "@apps/hono/src/lib/types";

import { LogoutButton } from "@/components/logout-button";

export default async function Profile() {
  const headerList = await headers();

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: "http://localhost:3000",
      headers: {
        cookie: headerList.get("cookie") || "",
      },
    }
  );

  return (
    <div>
      Hello {session?.user.name}:{session?.user.email} profile page: This is
      protected
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
}
