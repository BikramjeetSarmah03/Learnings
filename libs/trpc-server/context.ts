import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createTRPCContext = ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const header = req.headers.authorization
  const token = header?.split(' ')[1]

  // bearer
  return { req, res, token }
}

export type ITRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
