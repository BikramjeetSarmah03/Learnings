"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { httpBatchLink, loggerLink } from "@trpc/client";

import superjson from "superjson";

import { trpc } from "@/lib/utils";

if (!process.env.NEXT_PUBLIC_TRPC_API_URL) {
  throw new Error("NEXT_PUBLIC_TRPC_API_URL is not set");
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const trpcClient = trpc.createClient({
  transformer: superjson,

  links: [
    loggerLink({
      enabled: () => process.env.NODE_ENV === "development",
    }),

    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_API_URL,
    }),
  ],
});

export function TRPCProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <trpc.Provider client={trpcClient} queryClient={queryClient as any}>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools position="bottom-left" />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
