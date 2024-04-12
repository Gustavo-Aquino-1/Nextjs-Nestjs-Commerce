import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Favorites from './page'
import nextAuthOptions from '@/lib/nextAuthOptions'

export default async function FavoritesLayout() {
  const session = await getServerSession(nextAuthOptions)
  if (!session?.user) {
    redirect('/login')
  }

  return <Favorites />
}
