'use client'

import { Open_Sans } from 'next/font/google'
import api from '@/app/api'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FavoritesProps {
  user: any
}

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['600'],
})

function FavoritesClient({ user }: FavoritesProps) {
  const [favorites, setFavorites] = useState<any>([])
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    async function get() {
      await getFavorites()
    }
    get()
  }, [])

  async function getFavorites() {
    const { data } = await api.get(
      `/product/favorite?startIn=${favorites.length}`,
      {
        headers: { Authorization: user.acess_token },
      },
    )
    if (data.length < 5) setFinished(true)
    setFavorites([...favorites, ...data])
  }

  return (
    <div className='min-h-[20rem] mt-20 mb-40 p-4 pl-10 flex flex-col gap-10'>
      <h1 className='text-2xl max-md:text-center'>My Favorites</h1>
      <div
        className={`flex flex-wrap gap-[4rem] max-md:flex-col max-md:justify-center max-md:gap-10`}
      >
        {favorites.map((e: any) => (
          <div
            key={e.product.id}
            className='flex flex-col items-center justify-center gap-2 hover:scale-105'
          >
            <Link className='z-0' href={`/product/${e.product.id}`}>
              <Image
                src={e.product.img}
                width={300}
                height={300}
                alt={e.product.name}
              />
            </Link>
            <Link
              href={`/product/${e.product.id}`}
              className={`font-semibold hover:text-emerald-600 hover:underline text-lg text-gray-600`}
            >
              {e.product.name}
            </Link>
            <div className='pb-4'>
              <p className='text-gray-500 line-through'>{`R$ ${
                e.product.price + e.product.price * 0.2
              }`}</p>
              <p
                className={`z-0 ${openSans.className} text-lg`}
              >{`R$ ${e.product.price}`}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className='border-2 px-2 self-center py-1 border-gray-700 bg-gray-600 text-white disabled:opacity-70 hover:bg-gray-800'
        onClick={getFavorites}
        disabled={finished}
      >
        View More
      </button>
    </div>
  )
}

export default FavoritesClient
