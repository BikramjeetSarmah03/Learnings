'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpcClient as trpc } from './client'
import { httpBatchLink } from '@trpc/client'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())

  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
