import { CardWrapper } from "@/components/auth/card-wrapper";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps) {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account ?"
      backButtonHref="/auth/register"
      showSocial
    >
      login-form
    </CardWrapper>
  );
}
