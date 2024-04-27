import { getServerSession } from 'next-auth'
import Order from './page'
import nextAuthOptions from '@/lib/nextAuthOptions'

export default async function OrderLayout() {
  return <Order />
}
