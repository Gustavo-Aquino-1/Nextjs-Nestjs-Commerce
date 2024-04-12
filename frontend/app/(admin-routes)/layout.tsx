import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MyAccount from './account/page'
import nextAuthOptions from '@/lib/nextAuthOptions'

interface LoginLayoutProps {
  children: ReactNode
}

export default async function LoginLayout() {
  const session = await getServerSession(nextAuthOptions)
  if (!session) {
    return redirect('/login')
  }
  return <MyAccount  /> // user={session?.user}
}
