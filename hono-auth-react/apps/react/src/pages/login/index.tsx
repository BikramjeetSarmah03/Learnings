import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
    </div>
  );
}
