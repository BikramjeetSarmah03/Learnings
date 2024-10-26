"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function ServerComponent() {
  const { data: session, isPending, isRefetching } = authClient.useSession();

  if (!isPending && !isRefetching && !session) {
    return redirect("/login");
  }

  return (
    <div>
      Hello {session?.user.name}:{session?.user.email} profile page: This is
      protected
      <Button
        onClick={() => {
          authClient.signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
