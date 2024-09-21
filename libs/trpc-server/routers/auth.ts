import { isAuthed } from '../middleware'

import { privateProcedure, router, t } from '../trpc'

import { prisma } from '@libs/db'

export const authRoutes = router({
  users: privateProcedure.query(() => {
    return prisma.user.findMany()
  }),
  admin: t.procedure.use(isAuthed('admin')).query(() => {
    return prisma.user.findMany()
  }),
})
