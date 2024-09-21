import { z } from 'zod'

export const formSchemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.optional(z.string()),
  image: z.optional(z.string()),
})
