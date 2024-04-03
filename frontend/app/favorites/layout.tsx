import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Favorites from './page'

export default async function FavoritesLayout() {
  const session = await getServerSession(nextAuthOptions)
  if (!session?.user) {
    redirect('/login')
  }

  return <Favorites user={session?.user} />
}
