import { z } from 'zod'
import { AuthProviderType } from '@libs/db/types'

export const formSchemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.optional(z.string()),
  image: z.optional(z.string()),
})

export const formSchemaLogin = formSchemaRegister.pick({
  email: true,
  password: true,
})

export const formSchemaUser = z.object({
  id: z.string(),
})

export const zodSchemaRegisterWithProvider = z.object({
  id: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(AuthProviderType),
})
