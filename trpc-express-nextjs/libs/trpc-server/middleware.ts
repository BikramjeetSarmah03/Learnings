import { TRPCError } from '@trpc/server'
import { JwtPayload, verify } from 'jsonwebtoken'

import { t } from './trpc'
import { ROLE } from './types'
import { authorizedUser } from './util'

export const isAuthed = (...roles: ROLE[]) =>
  t.middleware(async (opts) => {
    const { token } = opts.ctx

    if (!token)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Token not found',
      })

    let userId

    try {
      const user = verify(token, process.env.NEXTAUTH_SECRET || '')

      userId = (user as JwtPayload).id
    } catch (error) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid token',
      })
    }

    if (roles.length > 0) {
      await authorizedUser(userId, roles)
    }

    return opts.next({ ...opts, ctx: { ...opts.ctx, userId } })
  })
