import { createTRPCReact } from '@trpc/react-query'

import { AppRouter } from '@libs/trpc-server/routers'

export const trpcClient = createTRPCReact<AppRouter>()
