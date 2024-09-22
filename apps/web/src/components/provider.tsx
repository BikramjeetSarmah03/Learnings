'use client'

import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

export const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>
}
