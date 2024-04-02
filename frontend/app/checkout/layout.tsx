import { PropsWithChildren } from 'react'
import Checkout from './page'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

export default async function CheckoutLayout() {
  const { user } = await getServerSession(nextAuthOptions)
  return <Checkout user={user} />
}
