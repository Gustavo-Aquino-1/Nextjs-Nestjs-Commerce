import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LoginLayoutProps {
  children: ReactNode
}

export default async function LoginLayout({ children }: LoginLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  if (!session) {
    return redirect('/')
  }
  return <>{children}</>
}
