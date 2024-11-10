import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLayoutEffect, useState } from "react";
import { apiClient } from "./lib/api";

export const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useLayoutEffect(() => {
    async function fetchTotal() {
      const data = (await apiClient.expenses["total-spent"].$get()).json();

      setTotalSpent((await data).total);
    }

    fetchTotal();
  }, []);

  return (
    <div className="w-full p-4">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{totalSpent}</CardContent>
      </Card>
    </div>
  );
};
