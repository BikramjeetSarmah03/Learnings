import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const getCookies = cookies()

  const nextAuthSession = getCookies.get('next-auth.session-token')?.value || ''

  return NextResponse.json(nextAuthSession)
}
