import OrderClient from '@/components/OrderClient'
import nextAuthOptions from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Order() {
  const session = await getServerSession(nextAuthOptions)
  return <OrderClient user={session?.user} />
}

export default Order
