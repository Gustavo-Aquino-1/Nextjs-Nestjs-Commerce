'use client'

import api from '@/app/api'
import { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

interface FavoriteProps {
  token: string | undefined
  productId: number
}

function Favorite({ token, productId }: FavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkFavorite() {
      const { message } = await favorite('yes')
      if (message == 'yes') setIsFavorite(true)
      setLoading(false)
    }
    checkFavorite()
  }, [])

  async function favorite(check?: string) {
    const { data } = await api.patch(
      `/product/favorite/${productId}?check=${check ? check : 'not'}`,
      null,
      {
        headers: { Authorization: token },
      },
    )
    return data
  }

  const handleClick = async () => {
    await favorite()
    setIsFavorite(!isFavorite)
  }

  return (
    <>
      {!loading && (
        <span className='text-emerald-500 cursor-pointer' onClick={handleClick}>
          {isFavorite ? (
            <FaHeart size={30} />
          ) : (
            <FaRegHeart
              className='hover:text-emerald-500 text-black'
              size={30}
            />
          )}
        </span>
      )}
    </>
  )
}

export default Favorite
