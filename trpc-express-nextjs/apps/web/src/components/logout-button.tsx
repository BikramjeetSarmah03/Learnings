'use client'

import { signOut } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

export const LogoutButton = ({ children }: PropsWithChildren) => {
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: '/login',
    })
  }
  return (
    <button className="bg-red-500" onClick={handleLogout}>
      {children}
    </button>
  )
}
