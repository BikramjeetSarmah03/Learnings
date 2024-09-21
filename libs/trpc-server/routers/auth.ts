import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcryptjs'
import { v4 as uuidV4 } from 'uuid'

import { isAuthed } from '../middleware'

import { privateProcedure, publicProcedure, router, t } from '../trpc'

import { prisma } from '@libs/db'
import { formSchemaRegister } from '@libs/forms/src/schemas'
import { AuthProviderType } from '@libs/db/types'
import { sign } from 'jsonwebtoken'

export const authRoutes = router({
  users: privateProcedure.query(() => {
    return prisma.user.findMany()
  }),
  admin: t.procedure.use(isAuthed('admin')).query(() => {
    return prisma.user.findMany()
  }),
  register: publicProcedure
    .input(formSchemaRegister)
    .mutation(async ({ input: { email, password, name, image } }) => {
      const existingUser = await prisma.credentials.findUnique({
        where: {
          email: email,
        },
      })

      if (existingUser)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User already exists with this email',
        })

      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const id = uuidV4()

      const user = await prisma.user.create({
        data: {
          id,
          name,
          image,
          credentials: {
            create: {
              email,
              passwordHash,
            },
          },
          authProvider: { create: { type: AuthProviderType.CREDENTIALS } },
        },
      })

      const token = sign({ id: user.id }, process.env.NEXTAUTH_SECRET || '')

      return { user, token }
    }),
})
