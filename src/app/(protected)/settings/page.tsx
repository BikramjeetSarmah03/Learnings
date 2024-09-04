import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      SettingsPage: {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        ROLE:{session?.user.role}
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
