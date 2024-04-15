'use client'

import { Context } from '@/context/Provider'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { IoCart } from 'react-icons/io5'


interface CartIconProps {
  cart: any
}

function CartIcon({ cart }: CartIconProps) {
  const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    if (Object.keys(cart || {}).length > 0) {
      setCartQuantity(
        Object.keys(cart).reduce((a, c: any) => {
          return a + cart[c].quantity
        }, 0),
      )
    } else {
      setCartQuantity(0)
    }
  }, [cart])

  return (
    <Link className='relative' href='/cart'>
      {cartQuantity > 0 && (
        <span className={`absolute bg-red-500 rounded-full text-white text-sm ml-5 px-1 mt-[-5px] ${cartQuantity >= 100 && 'px-0 py-1 ml-2 mt-[-8px]'}`}>{cartQuantity >= 100 ? '99+' : cartQuantity}</span>
      )}
      {
        cartQuantity == 0 ? (
          <IoCartOutline size={'1.8rem'} />
        ): (
          <IoCart size={'1.8rem'} />
        )
      }
    </Link>
  )
}

export default CartIcon
