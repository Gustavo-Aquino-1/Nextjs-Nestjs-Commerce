import api from '@/app/api'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['600'],
})

interface ProductsProps {
  line: string
}

async function Products({ line }: ProductsProps) {
  const { data } = await api.get('/product?line=' + line)

  return (
    <div className='p-4 h-[20rem] mb-40'>
      <p
        className={`text-center capitalize text-2xl pb-10 text-red-400 ${openSans.className} hover:text-red-600`}
      >{`${line} line`}</p>
      <div className='flex justify-between max-w-[80%] m-auto'>
        {data.map((e: any) => (
          <div key={e.id} className='flex flex-col items-center justify-center'>
            <CiHeart
              size={25}
              className='self-end hover:scale-110 hover:text-red-800'
            />
            <Link className='scale-95 hover:scale-100 z-0' href='/home'>
              <Image src={e.img} width={250} height={250} alt={e.name} />
            </Link>
            <Link
              href='/home'
              className={`font-bold hover:text-red-500 hover:underline text-lg`}
            >
              {e.name}
            </Link>
            <p
              className={`z-0 ${openSans.className} text-lg`}
            >{`R$ ${e.price}`}</p>
            <p>4.5★</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
