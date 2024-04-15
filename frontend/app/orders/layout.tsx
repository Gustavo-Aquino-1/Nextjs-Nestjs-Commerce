import { getServerSession } from 'next-auth'
import Orders from './page'
import nextAuthOptions from '@/lib/nextAuthOptions'
import { PropsWithChildren } from 'react'

export default async function OrdersLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
