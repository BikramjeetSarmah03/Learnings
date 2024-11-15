import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useForm, type FieldApi } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await apiClient.expenses.$post({
        json: value,
      });

      if (!res.ok) throw new Error("Server error");

      navigate({ to: "/expenses" });
    },
  });

  return (
    <div className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="max-w-4xl p-4 m-auto space-y-4"
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                placeholder="Amount"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />

              <FieldInfo field={field} />
            </>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
