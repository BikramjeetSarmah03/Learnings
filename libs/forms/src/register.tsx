'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchemaRegister } from './schemas'

export type FormTypeRegister = z.infer<typeof formSchemaRegister>

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      image: '',
    },
  })
