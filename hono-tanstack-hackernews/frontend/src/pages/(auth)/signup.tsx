import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/shared/types";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldInfo } from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { postSignup, userQueryOptions } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

const signupSearchSchema = z.object({
  redirect: fallback(z.string(), "/").default("/"),
});

export const Route = createFileRoute("/(auth)/signup")({
  component: SignUp,
  validateSearch: zodSearchValidator(signupSearchSchema),
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions());

    if (user) {
      throw redirect({ to: search.redirect });
    }
  },
});

function SignUp() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await postSignup(value.username, value.password);
      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        router.invalidate();
        await navigate({ to: search.redirect });
        return null;
      } else {
        if (!res.isFormError) {
          toast.error("Signup failed", { description: res.error });
        }
        form.setErrorMap({
          onSubmit: res.isFormError ? res.error : "Unexpected error",
        });
      }
    },
  });

  return (
    <div className="size-full">
      <Card className="mx-auto mt-12 max-w-sm border-border/25">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl">SignUp</CardTitle>
            <CardDescription className="text-center">
              Enter your details below to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <form.Field
                name="username"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Username</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Username"
                    />

                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="******"
                    />

                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Subscribe
                selector={(state) => [state.errorMap]}
                children={([errorMap]) =>
                  errorMap.onSubmit ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {errorMap.onSubmit?.toString()}
                    </p>
                  ) : null
                }
              />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full"
                  >
                    {isSubmitting ? "..." : "Signup"}
                  </Button>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Already have an account ?{" "}
              <Link to="/login" className="text-foreground hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
