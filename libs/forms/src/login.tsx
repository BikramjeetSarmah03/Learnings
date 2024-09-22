'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchemaLogin } from './schemas'

export type FormTypeLogin = z.infer<typeof formSchemaLogin>

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  })
