import { PropsWithChildren } from 'react'
import Checkout from './page'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import nextAuthOptions from '@/lib/nextAuthOptions'

export default async function CheckoutLayout() {
  const data = await getServerSession(nextAuthOptions)
  if(!data?.user) {
    redirect('/login')
  }
  return <Checkout />
}
