'use client'

import Image from 'next/image'
import Favorite from './Favorite'
import { useContext, useState } from 'react'
import { Context } from '@/context/Provider'
import Modal from './Modal'

interface ProductProps {
  product: any
}

export default function ProductOptions({ product }: ProductProps) {
  const { cart, addToCart, removeFromCart } = useContext(Context)
  const [size, setSize] = useState<string>()
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        message='Product added to cart sucessfully!'
      />
      <div className='flex min-w-[90%] max-w-[90%] max-md:max-w-[100%] justify-center gap-20 items-center m-auto flex-wrap max-md:justify-center'>
        <Image
          src={product?.img}
          alt={product?.name}
          width={600}
          height={600}
        />
        <div className='flex flex-col gap-6'>
          <div>
            <p className='font-bold text-xl mb-4'>Available sizes:</p>
            <div className='flex gap-2'>
              {product?.size.sizes.split(' ').map((sizeOption: string) => (
                <button
                  className={`p-3 border-2 border-solid border-gray hover:border-black active:bg-black active:text-white ${
                    sizeOption == size && 'bg-black text-white'
                  }`}
                  key={sizeOption}
                  onClick={() => setSize(sizeOption)}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!size}
            onClick={() => {
              addToCart(product, size)
              setModalOpen(true)
            }}
            className='bg-emerald-950 text-white p-3 rounded-md'
          >
            Add to Cart
          </button>
          <button
            disabled={!size}
            onClick={() => removeFromCart(product, size)}
            className='bg-black text-white p-3 rounded-md'
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  )
}
