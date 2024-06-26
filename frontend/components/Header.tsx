'use client'

import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import CartIcon from './CartIcon'
import { useContext, useEffect } from 'react'
import { Context } from '@/context/Provider'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Header() {
  const { cart, setBuyNowMode } = useContext(Context) as any

  return (
    <header className='flex justify-between w-full p-[1rem] py-[1.3rem] fixed top-0 lg:bg-[#141414]md:bg-[#141414]  bg-slate-800 text-white z-50 items-center'>
      <Link href='/' className='text-pretty text-xl'>
        GAX
      </Link>
      <div className='flex md:flex-row-reverse'>
        <div className='flex gap-4 max-md:invisible md:self-end'>
          <Link href='/search'>
            <CiSearch size={'2rem'} />
          </Link>
          <Link onClick={() => setBuyNowMode(false)} href='/cart'>
            <CartIcon cart={cart} />
          </Link>
          <Link href='/account'>
            <FaUser size={'1.8rem'} />
          </Link>
        </div>
        <div className='max-md:visible md:invisible'>
          <Link href='/options'>
            <GiHamburgerMenu size={30} />
          </Link>
        </div>
      </div>
    </header>
  )
}
