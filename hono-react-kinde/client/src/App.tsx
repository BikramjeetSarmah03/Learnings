import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLayoutEffect, useState } from "react";
import { apiClient } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const res = await apiClient.expenses["total-spent"].$get();

  if (!res.ok) throw new Error("Server error");

  const data = await res.json();
  return data;
}

export const App = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full p-4">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isFetching ? "Loading..." : data?.total}</CardContent>
      </Card>
    </div>
  );
};
