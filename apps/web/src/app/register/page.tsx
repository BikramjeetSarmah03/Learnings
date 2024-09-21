'use client'

import { useFormRegister } from '@libs/forms/src/register'
import { trpcClient } from '@libs/trpc-client/src/client'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const { mutateAsync } = trpcClient.auth.register.useMutation()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log({ data })
        const user = await mutateAsync(data)

        console.log({ user })
      })}
    >
      <input placeholder="Name" type="text" {...register('name')} />
      <input placeholder="Email" type="email" {...register('email')} />
      <input placeholder="Password" type="password" {...register('password')} />

      <button type="submit">Submit</button>

      {JSON.stringify(errors.email?.message)}
      {JSON.stringify(errors.image?.message)}
      {JSON.stringify(errors.name?.message)}
      {JSON.stringify(errors.password?.message)}
    </form>
  )
}
