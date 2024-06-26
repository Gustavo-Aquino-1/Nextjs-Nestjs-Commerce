'use client'

import CartProducts from '@/components/CartProducts'
import FormModal from '@/components/FormModal'
import Modal from '@/components/Modal'
import Products from '@/components/Products'
import { Context } from '@/context/Provider'
import { round } from '@/utils/price'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    setTotal: setGlobalTotal,
    buyNow,
    setBuyNow,
    buyNowMode,
  } = useContext(Context) as any
  const [inputVisible, setInputVisible] = useState(false)
  const [promoCode, setPromoCode] = useState(false)
  const [productQuantity, setProductQuantity] = useState(0)
  const [total, setTotal] = useState<number>()
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (buyNowMode) {
      setProductQuantity(buyNow.quantity)
      setTotal(buyNow.price * buyNow.quantity)
    } else {
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
    }
  }, [cart, buyNow])

  return (
    <div className=''>
      {Object.keys(cart).length == 0 && !buyNowMode ? (
        <div className='flex flex-col justify-center mt-32 gap-4'>
          <h1 className='text-center text-2xl font-bold'>
            You don&apos;t have products in your cart!
          </h1>
          <Link
            className='text-center text-lg text-blue-600 underline'
            href='/search'
          >
            Search Products Here
          </Link>
        </div>
      ) : (
        <>
          <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            message='Promo code in use!'
          />
          <div className='flex justify-center m-auto max-w-[90%] gap-20 mt-32 max-[1050px]:flex-col mb-20 max-md:mt-10'>
            {buyNowMode ? (
              <div
                className='flex gap-10 text-lg max-md:flex-col max-md:items-center'
                key={buyNow}
              >
                <Image
                  src={buyNow.img}
                  width={300}
                  height={300}
                  alt={buyNow.name}
                />
                <div className='flex flex-col justify-center gap-5'>
                  <p title={buyNow.name} className='text-lg font-bold'>
                    {buyNow.name}
                  </p>
                  <p className='text-lg font'>
                    <strong>Size:</strong> {buyNow.size}
                  </p>
                  <p>{`R$ ${buyNow.price}`}</p>
                  <div className='flex gap-5'>
                    <button
                      onClick={() => {
                        if (buyNow.quantity <= 1) {
                          setBuyNow({})
                          return
                        }
                        setBuyNow({ ...buyNow, quantity: buyNow.quantity - 1 })
                      }}
                      className='border-2 border-gray-300 px-2'
                    >
                      -
                    </button>
                    <p>{buyNow.quantity}</p>
                    <button
                      onClick={() =>
                        setBuyNow({ ...buyNow, quantity: buyNow.quantity + 1 })
                      }
                      className='border-2 border-gray-300 px-2'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='w-[40%] max-md:w-[100%] flex flex-col gap-5 max-md:items-center'>
                <h1 className='text-2xl'>Your cart</h1>
                {Object.keys(cart).map((e: any) => (
                  <div
                    className='flex gap-10 text-lg max-md:flex-col max-md:items-center'
                    key={e}
                  >
                    <Image
                      src={cart[e].img}
                      width={300}
                      height={300}
                      alt={cart[e].name}
                    />
                    <div className='flex flex-col justify-center gap-5'>
                      <p title={cart[e].name} className='text-lg font-bold'>
                        {cart[e].name}
                      </p>
                      <p className='text-lg font'>
                        <strong>Size:</strong> {cart[e].size}
                      </p>
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
            )}

            <div className='flex flex-col gap-5 text-lg w-[25%] max-md:w-[100%]'>
              <h1 className='text-2xl font-bold'>Summary</h1>
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{`R$ ${total}`}</p>
              </div>
              <div className='flex justify-between'>
                <p>Estimated Shipping</p>
                <p>{`R$ ${round(productQuantity * 0.6) + 5}`}</p>
              </div>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>{`R$ ${Number(
                  round(total) + round(productQuantity * 0.6) + 5,
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
                        setTotal(round(Number(total) * 0.9))
                        setPromoCode(true)
                        setModalOpen(true)
                      }}
                      className='flex justify-between gap-5 max-w-[100%]'
                    >
                      <input
                        className='border-2 border-gray-400 rounded-md w-[90%] outline-slate-500 px-2'
                        type='text'
                        minLength={8}
                        required
                      />
                      <input
                        className='px-5 py-2 bg-slate-800 text-white rounded-md'
                        type='submit'
                        value='Apply'
                      />
                    </form>
                  )}
                </>
              )}
              <button
                onClick={(e) => {
                  setGlobalTotal(
                    round(round(total) + round(productQuantity * 0.6)),
                  )
                  router.push('/checkout')
                }}
                className='bg-slate-800 text-white py-2 rounded-md'
              >
                Finish
              </button>
            </div>
          </div>
        </>
      )}

      <CartProducts notIn={Object.keys(cart).map((e) => cart[e].id)} />
    </div>
  )
}

export default Cart
