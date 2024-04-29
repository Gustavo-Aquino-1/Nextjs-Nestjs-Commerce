'use client'

import api from '@/app/api'
import { Open_Sans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['600'],
})

interface ICartProducts {
  notIn: number[]
}

function CartProducts({ notIn }: ICartProducts) {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const route = '/product?notIn=' + JSON.stringify(notIn) + '&take=4'
    const { data } = await api.get(route)
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='p-4 min-h-[20rem] mb-10'>
      <p
        className={`text-center capitalize text-2xl pb-10  ${openSans.className} text-gray-700 font-bold text-slate-600`}
      >
        You should like
      </p>
      <div
        className={`flex justify-between m-auto ${
          products.length >= 3 ? 'max-w-[95%]' : 'max-w-[50%]'
        }  max-lg:max-w-none gap-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-md:pr-[50px] scrollbar-thin
        lg:overflow-x-hidden max-lg:overflow-x-scroll overflow-y-hidden scrollbar-track-gray-200 scrollbar-thumb-gray-400 active:scrollbar-thumb-gray-500`}
      >
        {products.map((e: any) => (
          <div
            key={e.id}
            className='flex flex-col items-center justify-center max-md:items-start gap-2  lg:rounded-md lg:hover:scale-105 max-lg:bg-white max-lg:text-black'
          >
            <Link className='z-0 scale-100' href={`/product/${e.id}`}>
              <Image
                className='lg:rounded-t-md min-w-[400px] max-md:min-w-[300px]'
                src={e.img}
                width={300}
                height={300}
                alt={e.name}
              />
            </Link>
            <Link
              href={`/product/${e.id}`}
              className={`font-semibold hover:font-bold text-lg max-md:text-base`}
            >
              {e.name}
            </Link>
            <div className='pb-4'>
              <p className='text-gray-500 line-through'>{`R$ ${
                e.price + e.price * 0.2
              }`}</p>
              <p
                className={`z-0 ${openSans.className} text-lg text-[#bfa75d] `}
              >{`R$ ${e.price}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartProducts
