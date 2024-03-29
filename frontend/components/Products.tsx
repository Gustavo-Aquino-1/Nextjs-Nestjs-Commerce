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
  // charge = 1
  // after each requisiton charge + 1
  // startIn = charge x 3 (if 3 is the number of products get in each requisition)
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
        className={`text-center capitalize text-2xl pb-10 ${openSans.className} hover:underline`}
      >
        {title}
      </p>
      <div
        className={`flex justify-between m-auto ${
          data.length >= 3 ? 'max-w-[80%]' : 'max-w-[50%]'
        } max-md:flex-col max-md:max-w-[90%] max-md:justify-center max-md:gap-10`}
      >
        {data.map((e: any) => (
          <div key={e.id} className='flex flex-col items-center justify-center'>
            <Link
              className='scale-95 hover:scale-100 z-0'
              href={`/product/${e.id}`}
            >
              <Image src={e.img} width={300} height={300} alt={e.name} />
            </Link>
            <Link
              href={`/product/${e.id}`}
              className={`font-bold hover:text-emerald-600 hover:underline text-lg`}
            >
              {e.name}
            </Link>
            <p
              className={`z-0 ${openSans.className} text-lg`}
            >{`R$ ${e.price}`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
