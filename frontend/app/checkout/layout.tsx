import { PropsWithChildren } from 'react'
import Checkout from './page'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function CheckoutLayout() {
  const data = await getServerSession(nextAuthOptions)
  if(!data?.user) {
    redirect('/login')
  }
  return <Checkout user={data.user} />
}
