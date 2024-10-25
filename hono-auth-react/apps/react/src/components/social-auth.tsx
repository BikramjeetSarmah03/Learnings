import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const SocialAuth = () => {
  const handleGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/profile",
    });
  };

  return (
    <>
      <Button onClick={handleGithub} variant="outline" className="w-full">
        Login with Github
      </Button>
    </>
  );
};
