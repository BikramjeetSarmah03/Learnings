import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "@/components/register-form";

export const Route = createFileRoute("/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <RegisterForm />
    </div>
  );
}
