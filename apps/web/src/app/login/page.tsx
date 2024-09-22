'use client'

import { useFormLogin } from '@libs/forms/src/login'
import { signIn } from 'next-auth/react'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: '/',
        })
      })}
    >
      <input placeholder="Email" type="email" {...register('email')} />
      <input placeholder="Password" type="password" {...register('password')} />

      <button type="submit">Submit</button>

      <button
        type="button"
        onClick={() => {
          signIn('google', {
            callbackUrl: '/',
          })
        }}
      >
        Google Sign In
      </button>

      {JSON.stringify(errors.email?.message)}
    </form>
  )
}
