"use client";

import { trpc } from "@/lib/utils";

export default function Home() {
  const { data } = trpc.test.useQuery();

  return <div>{data}</div>;
}
