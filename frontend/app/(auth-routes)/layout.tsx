import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface LoginLayoutProps {
  children: ReactNode
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  if (session) {
    return redirect('/account')
  }
  return <>{children}</>
}
