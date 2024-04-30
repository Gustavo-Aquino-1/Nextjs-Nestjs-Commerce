'use client'

import { IoIosListBox } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { useEffect, useState } from 'react'
import OrdersClient from '@/components/OrdersClient'
import { useSession } from 'next-auth/react'
import FavoritesClient from '@/components/FavoriteClient'

function Account() {
  const { data: session } = useSession()
  const [page, setPage] = useState('orders')
  const [map, setMap] = useState<any>({})
  useEffect(() => {
    if(session?.user.id) {
      setMap({
        orders: <OrdersClient user={session?.user} />,
        favorites: <FavoritesClient user={session?.user} />,
      })
    }
  }, [session])

  return (
    session?.user.id && (
      <div className='flex'>
        <nav className='flex-start bg-gray-200 border-r-2 border-gray-300 p-2 px-10 min-h-screen relative'>
          <ul className='flex flex-col gap-10 mt-5 fixed left-6'>
            <li
              title='Settings'
              onClick={() => setPage('settings')}
              className='cursor-pointer'
            >
              <IoMdSettings size={30} />
            </li>
            <li
              title='Orders'
              onClick={() => setPage('orders')}
              className='cursor-pointer'
            >
              <IoIosListBox size={30} />
            </li>
            <li
              title='Favorites'
              onClick={() => setPage('favorites')}
              className='cursor-pointer'
            >
              <FaHeart size={30} />
            </li>
          </ul>
        </nav>
        <div className='flex-grow p-2'>
          {page != 'settings' ? (map[page]) : (
            <div className='p-5 flex flex-col gap-5 items-start'>
              <p className='text-xl'>{session.user.name}</p>
              <button className='bg-blue-600 text-white font-semibold px-2 p-1 rounded'>change my password</button>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Account
