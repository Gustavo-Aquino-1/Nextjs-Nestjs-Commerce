import api from '@/app/api'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { Open_Sans } from 'next/font/google'
import Favorite from './Favorite'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['600'],
})

interface ProductsProps {
  title: string
  productId?: number
  filters?: {
    take?: number
    line?: string
    minPrice?: number
    maxPrice?: number
    type?: string
    name?: string
  }
}

async function Products({ title, productId, filters }: ProductsProps) {
  let filtersStr = Object.keys(filters)
    .map((e) => `${e}=${filters[e]}&`)
    .join('')
  filtersStr = filtersStr.slice(0, filtersStr.length - 1)
  let { data } = (await api.get(`/product?${filtersStr}`)) as any[]
  if (productId) {
    data = data.filter((e) => e.id != productId)
  }

  return (
    <div className='p-4 min-h-[20rem] mb-40'>
      <p
        className={`text-center capitalize text-2xl pb-10  ${openSans.className} hover:`}
      >
        {title}
      </p>
      <div
        className={`flex justify-between m-auto ${
          data.length >= 3 ? 'max-w-[80%]' : 'max-w-[50%]'
        } max-md:overflow-x-scroll max-md:max-w-none gap-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-md:pr-[50px] scrollbar-thin`}
      >
        {data.map((e: any) => (
          <div key={e.id} className='flex flex-col items-center justify-center max-md:items-start gap-2 lg:border-2 lg:border-gray-300 lg:rounded-md lg:hover:scale-105 bg-gray-300 text-gray-700 max-md:bg-white max-md:text-black'>
            <Link
              className='z-0 scale-100'
              href={`/product/${e.id}`}
            >
              <Image className='lg:rounded-t-md min-w-[200px]' src={e.img} width={300} height={300} alt={e.name} />
            </Link>
            <Link
              href={`/product/${e.id}`}
              className={`font-semibold hover:font-bold text-lg text-gray-600 max-md:text-base`}
            >
              {e.name}
            </Link>
            <div className='pb-4'>
              <p className='text-gray-500 line-through'>{`R$ ${e.price + e.price * 0.20}`}</p>
              <p
                className={`z-0 ${openSans.className} text-lg`}
              >{`R$ ${e.price}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
