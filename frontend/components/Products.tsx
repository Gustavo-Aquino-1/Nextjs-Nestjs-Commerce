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
  let finalStr = ''
  if (filters && Object.keys(filters).length > 0) {
    let filtersStr = Object.keys(filters) as [
      'take',
      'line',
      'minPrice',
      'maxPrice',
      'type',
    ]
    filtersStr = filtersStr.map((e) => `${e}=${filters[e]}&`).join('') as any
    finalStr = filtersStr.slice(0, filtersStr.length - 1) as any
  }
  let { data } = (await api.get(`/product?${finalStr}`)) as any
  if (productId) {
    data = data.filter((e: any) => e.id != productId)
  }

  return (
    <div className='p-4 min-h-[20rem] mb-10'>
      <p
        className={`text-center capitalize text-2xl pb-10  ${openSans.className} text-gray-700 font-bold text-slate-600`}
      >
        {title}
      </p>
      <div
        className={`flex justify-between m-auto ${
          data.length >= 3 ? 'max-w-[95%]' : 'max-w-[50%]'
        }  max-lg:max-w-none gap-10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full max-md:pr-[50px] scrollbar-thin
        lg:overflow-x-hidden max-lg:overflow-x-scroll overflow-y-hidden scrollbar-track-gray-200 scrollbar-thumb-gray-400 active:scrollbar-thumb-gray-500 pb-4`}
      >
        {data.map((e: any) => (
          <div
            key={e.id}
            className='flex flex-col items-center justify-center max-md:items-center gap-2  lg:hover:scale-105 max-lg:bg-white max-lg:text-black border-2 border-gray-200'
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
            <div className='w-full h-full flex flex-col items-center p-2'>
              <Link
                href={`/product/${e.id}`}
                className={`font-semibold hover:font-bold text-lg max-md:text-base`}
              >
                {e.name}
              </Link>
              <div className='pb-4 flex flex-col items-center'>
                <p className='text-gray-500 line-through'>{`R$ ${
                  e.price + e.price * 0.2
                }`}</p>
                <p
                  className={`z-0 ${openSans.className} text-lg text-[#bfa75d] `}
                >{`R$ ${e.price}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
