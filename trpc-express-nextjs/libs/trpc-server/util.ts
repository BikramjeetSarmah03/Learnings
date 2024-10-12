import { TRPCError } from '@trpc/server'
import { ROLE } from './types'
import { prisma } from '@libs/db'

export const userHasRequiredRole = async (
  id: string,
  requiredRole: ROLE,
): Promise<boolean> => {
  let userExists

  switch (requiredRole) {
    case 'admin':
      userExists = await prisma.admin.findUnique({
        where: {
          id,
        },
      })

      break
    case 'manager':
      userExists = await prisma.manager.findUnique({
        where: {
          id,
        },
      })
      break
  }

  return Boolean(userExists)
}

export const authorizedUser = async (
  id: string,
  roles: ROLE[],
): Promise<void> => {
  if (!roles || roles.length === 0) return

  const roleCheckPromises = roles.map((role) => userHasRequiredRole(id, role))

  const roleCheckResults = await Promise.all(roleCheckPromises)

  if (!roleCheckResults.some(Boolean)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the required role',
    })
  }

  return
}
