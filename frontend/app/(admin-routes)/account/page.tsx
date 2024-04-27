'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { RiFileListLine } from 'react-icons/ri'
import { MdFavorite } from 'react-icons/md'
import { MdOutlinePersonOutline } from 'react-icons/md'
import favoritesImage from '@/public/favorites.png'
import ordersImage from '@/public/orders.png'
import Image from 'next/image'
import { Quicksand } from 'next/font/google'
import { Context } from '@/context/Provider'

const quickFont = Quicksand({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
})

function MyAccount() {
  const [accountOptions, setAccountOptions] = useState(false)
  const { setCart } = useContext(Context) as any
  return (
    <div className='p-10 flex flex-col gap-10'>
      <h1
        className={`text-3xl text-slate-800 font-semibold ${quickFont.className}`}
      >
        My Account
      </h1>
      <ul className='flex text-2xl gap-20 flex-wrap'>
        <li className='border-4 border-gray-700 rounded-lg hover:scale-105'>
          <Link
            className='hover:text-slate-600 flex items-center gap-2'
            href='/orders'
          >
            <Image
              className=''
              src={ordersImage}
              width={480}
              height={500}
              alt='orders'
            />
          </Link>
        </li>
        <li>
          <Link
            className='hover:text-slate-600 flex items-center gap-2 rounded-lg hover:scale-105 border-4 border-gray-700'
            href='/favorites'
          >
            <Image
              className=''
              src={favoritesImage}
              width={480}
              height={500}
              alt='favorites'
            />
          </Link>
        </li>
      </ul>
      <button
        onClick={async () => {
          setCart({})
          await signOut()
        } 
      }
        className={`text-3xl text-slate-800 font-semibold ${quickFont.className} self-start bg-[#f6f6f6] rounded border border-gray-500 px-2 p-1 hover:bg-green-600 hover:text-white hover:border-transparent mt-5`}
      >
        Logout
      </button>
    </div>
  )
}

export default MyAccount
