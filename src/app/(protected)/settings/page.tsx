"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      SettingsPage: ROLE:{user?.role}
      <Button onClick={onClick} type="submit">
        Sign Out
      </Button>
    </div>
  );
}
