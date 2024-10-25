import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  loader: async () => {
    const { data: session } = await authClient.getSession();
    if (!session || !session.user) throw redirect({ to: "/login" });

    return { user: session.user };
  },
});

function ProfilePage() {
  const { user } = Route.useLoaderData();

  return (
    <div className="p-2">
      Hello {user.name}:{user.email} profile page: This is protected
    </div>
  );
}
