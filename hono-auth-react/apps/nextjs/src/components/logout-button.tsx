"use client";

import { authClient } from "@/lib/auth-client";
import { Button, ButtonProps } from "./ui/button";
import { useRouter } from "next/navigation";

type LogoutButtonProps = ButtonProps;

export const LogoutButton = ({ children, ...props }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {children}
    </Button>
  );
};
