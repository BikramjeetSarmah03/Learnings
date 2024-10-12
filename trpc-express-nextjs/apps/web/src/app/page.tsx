import { LogoutButton } from '@/components/logout-button'
import { getAuth } from '@libs/network/src/auth/authOptions'
import Link from 'next/link'

export default async function Home() {
  const auth = await getAuth()

  return (
    <div>
      Hello World: {auth?.user?.email}
      {auth?.user?.email ? (
        <LogoutButton>Logout</LogoutButton>
      ) : (
        <Link href={'/login'}>Sign In</Link>
      )}
    </div>
  )
}
