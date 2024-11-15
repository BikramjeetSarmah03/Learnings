import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/create-expense")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <form className="max-w-4xl p-4 m-auto">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Title" />

        <Label htmlFor="amont">Amount</Label>
        <Input type="number" id="amont" placeholder="Amount" />

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
