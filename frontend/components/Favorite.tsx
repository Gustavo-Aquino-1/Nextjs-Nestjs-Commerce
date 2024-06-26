'use client'

import api from '@/app/api'
import { useRouter } from 'next/navigation'
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
  const [logged, setLogged] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkFavorite() {
      const { message } = await favorite('yes')
      if (message == 'yes') setIsFavorite(true)
      setLoading(false)
    }
    checkFavorite()
  }, [])

  async function favorite(check?: string) {
    try {
      const { data } = await api.patch(
        `/product/favorite/${productId}?check=${check ? check : 'not'}`,
        null,
        {
          headers: { Authorization: token },
        },
      )
      return data
    } catch (error) {
      setLogged(false)
      return { message: 'not'}
    }
  }

  const handleClick = async () => {
    if(!logged) {
      router.push('/login')
      return
    } 
    await favorite()
    setIsFavorite(!isFavorite)
  }

  return (
    <>
      {!loading && (
        <span className='text-slate-700 cursor-pointer hover:text-slate-500' onClick={handleClick}>
          {isFavorite ? (
            <FaHeart size={30} />
          ) : (
            <FaRegHeart
              size={30}
            />
          )}
        </span>
      )}
    </>
  )
}

export default Favorite
