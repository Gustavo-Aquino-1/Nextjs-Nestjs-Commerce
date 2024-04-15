import OrdersClient from '@/components/OrdersClient'
import nextAuthOptions from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function Orders() {
  const session = await getServerSession(nextAuthOptions)
  if (!session?.user) redirect('/login')
  return <OrdersClient user={session?.user} />
}

export default Orders
