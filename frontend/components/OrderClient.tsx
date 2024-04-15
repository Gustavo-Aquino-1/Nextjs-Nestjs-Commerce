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
      <div className={`p-10 flex flex-col gap-10 ${modalOpen ? 'blur' : ''}`}>
        <div className='text-xl' key={orderDetails.id}>
          <p>{`Total: R$ ${orderDetails.total}`}</p>
          <p>{`Date: ${orderDetails.saleDate
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/')}`}</p>
          <p>{`Delivered To: ${orderDetails.cep} at number: ${orderDetails.number}`}</p>
        </div>
        <h1 className='text-2xl'>Products</h1>
        <div
          className={`flex flex-wrap gap-[4rem] max-md:flex-col max-md:justify-center max-md:gap-10`}
        >
          {products.map((e: any) => (
            <div
              key={String(e.product.id) + e.size}
              className='flex flex-col items-center justify-center gap-2'
            >
              <Link className='z-0' href={`/product/${e.product.id}`}>
                <Image
                  src={e.product.img}
                  width={300}
                  height={300}
                  alt={e.product.name}
                />
              </Link>
              <Link
                href={`/product/${e.product.id}`}
                className={`font-semibold hover:text-emerald-600 hover:underline text-lg text-gray-600`}
              >
                {e.product.name}
              </Link>
              <div className='pb-4'>
                <p className={`z-0 text-lg`}>{`R$ ${e.product.price}`}</p>{' '}
                {/* price of the product when it was sale */}
                <p className='text-lg'>{`Size: ${e.size}`}</p>
                <p className='text-lg'>{`Quantity: ${e.quantity}`}</p>
                <button
                  onClick={() => rateProduct(e.product.id)}
                  className='border-2 bg-black text-white px-5 rounded hover:bg-gray-800'
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
