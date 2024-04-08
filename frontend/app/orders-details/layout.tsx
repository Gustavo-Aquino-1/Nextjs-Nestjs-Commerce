import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import Order from './page'

export default async function OrderLayout() {
  const session = await getServerSession(nextAuthOptions)
  return <Order user={session?.user} />
}
