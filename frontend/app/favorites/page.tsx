import FavoritesClient from '@/components/FavoriteClient'
import nextAuthOptions from '@/lib/nextAuthOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Favorites() {
  const session = await getServerSession(nextAuthOptions)
  return <FavoritesClient user={session?.user} />
}

export default Favorites
