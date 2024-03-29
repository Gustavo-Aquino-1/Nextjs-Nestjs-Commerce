'use client'

import FormModal from '@/components/FormModal'
import Modal from '@/components/Modal'
import { Context } from '@/context/Provider'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

function Cart() {
  const { cart, addToCart, removeFromCart } = useContext(Context)
  const [inputVisible, setInputVisible] = useState(false)
  const [promoCode, setPromoCode] = useState(false)
  const [productQuantity, setProductQuantity] = useState(0)
  const [total, setTotal] = useState<number>()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    let quantity = 0
    setTotal(
      +Number(
        Object.keys(cart).reduce((a, c) => {
          quantity += cart[c].quantity
          return (a += cart[c].quantity * cart[c].price)
        }, 0),
      ).toFixed(2),
    )
    setProductQuantity(quantity)
  }, [cart])

  return (
    <div className='min-w-full m-0'>
      <FormModal />
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        message='Promo code in use!'
      />
      <div className='flex justify-center m-auto max-w-[90%] gap-20 mt-32 max-md:flex-col mb-20'>
        <div className='w-[40%] max-md:w-[100%] flex flex-col gap-5'>
          <h1 className='text-2xl font-semibold'>Your cart</h1>
          {Object.keys(cart).map((e: any) => (
            <div className='flex gap-10 text-lg' key={e}>
              <Image
                src={cart[e].img}
                width={300}
                height={300}
                alt={cart[e].name}
              />
              <div className='flex flex-col justify-center gap-5'>
                <p className='text-lg font-bold'>{cart[e].name}</p>
                <p>{`R$ ${cart[e].price}`}</p>
                <div className='flex gap-5'>
                  <button
                    onClick={() => removeFromCart(cart[e], cart[e].size)}
                    className='border-2 border-gray-300 px-2'
                  >
                    -
                  </button>
                  <p>{cart[e].quantity}</p>
                  <button
                    onClick={() => addToCart(cart[e], cart[e].size)}
                    className='border-2 border-gray-300 px-2'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-5 text-lg w-[25%] max-md:w-[100%]'>
          <h1 className='text-2xl font-bold'>Summary</h1>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{`R$ ${total}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Estimated Shipping</p>
            <p>{`R$ ${Number(productQuantity * 0.6).toFixed(2)}`}</p>
          </div>
          <div className='flex justify-between'>
            <p>Total</p>
            <p>{`R$ ${Number(
              +Number(total).toFixed(2) +
                +Number(productQuantity * 0.6).toFixed(2),
            ).toFixed(2)}`}</p>
          </div>
          {!promoCode && (
            <>
              {!inputVisible && (
                <p
                  onClick={() => setInputVisible(true)}
                  className='self-center underline text-gray-700 hover:cursor-pointer'
                >
                  Add a Promo Code
                </p>
              )}
            </>
          )}
          {!promoCode && (
            <>
              {inputVisible && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setTotal(+Number(Number(total) * 0.9).toFixed(2))
                    setPromoCode(true)
                    setModalOpen(true)
                  }}
                  className='flex justify-between gap-5 max-w-[100%]'
                >
                  <input
                    className='border-2 border-gray-400 rounded-md w-[90%]'
                    type='text'
                    minLength={8}
                    required
                  />
                  <input
                    className='px-5 py-2 bg-black text-white rounded-md'
                    type='submit'
                    value='Apply'
                  />
                </form>
              )}
            </>
          )}
          <button className='bg-black text-white py-2 rounded-md'>
            Finish
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
