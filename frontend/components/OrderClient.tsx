'use client'

import { Context } from '@/context/Provider'
import { useContext, useEffect, useState } from 'react'
import api from '@/app/api'
import Link from 'next/link'
import Image from 'next/image'
import RateModal from '@/components/RateModal'

interface OrderProps {
  user: any
}

function OrderClient({ user }: OrderProps) {
  const { orderDetails } = useContext(Context) as any
  const [products, setProducts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [productToRate, setProductToRate] = useState(0)

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get(`/order/${orderDetails.id}`, {
        headers: { Authorization: user.acess_token },
      })
      setProducts(data)
    }
    getProducts()
  }, [])

  const rateProduct = (id: number) => {
    setProductToRate(id)
    setModalOpen(true)
  }

  return (
    <>
      <div className={`pl-10 pt-10 flex flex-col gap-10 ${modalOpen ? 'blur' : ''}`}>
        <div className='text-xl' key={orderDetails.id}>
          <p className='text-2xl font-semibold mb-1'>Sale made at <span className='text-slate-600'>{orderDetails.saleDate
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')}</span></p>
          <p><strong>Total: </strong>R$ {orderDetails.total}</p>
          <p><strong>Delivered In: </strong> {`Cep ${orderDetails.cep} at number: ${orderDetails.number}`}</p>
        </div>
        <h1 className='text-2xl font-semibold'>Products</h1>
        <div
          className={`flex gap-10 overflow-x-scroll pb-5 scrollbar-thin pr-10`}
        >
          {products.map((e: any) => (
            <div
              key={String(e.product.id) + e.size}
              className='flex flex-col items-start justify-start gap-2 border-4 min-w-[300px] max-w-[300px]'
            >
              <Link className='z-0' href={`/product/${e.product.id}`}>
                <Image
                  className='max-h-[300px]'
                  src={e.product.img}
                  width={300}
                  height={300}
                  alt={e.product.name}
                />
              </Link>
              <Link
                href={`/product/${e.product.id}`}
                className={`font-semibold hover:text-slate-700 hover:underline text-lg text-black pl-4`}
              >
                {e.product.name}
              </Link>
              <div className='pb-4 pl-4 flex flex-col min-w-[300px] max-w-[300px]'>
                <p className={`z-0 text-lg`}> <strong>Price:</strong> {`R$ ${e.product.price}`}</p>{' '}
                {/* price of the product when it was sale */}
                <p className='text-lg'><strong>Size:</strong> {e.size}</p>
                <p className='text-lg'><strong>Quantity:</strong> {e.quantity}</p>
                <button
                  onClick={() => rateProduct(e.product.id)}
                  className='bg-blue-500 text-white px-8 rounded hover:bg-gray-800 self-end mr-5 font-semibold py-1'
                >
                  Rate
                </button>
                {/* in the page of rate will ask as a parameter one code it should be passed here in the url */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {productToRate > 0 && (
        <RateModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          user={user}
          productId={productToRate}
        />
      )}
    </>
  )
}

export default OrderClient
