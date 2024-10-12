import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import { AppRouter } from '@libs/trpc-server/routers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
})
