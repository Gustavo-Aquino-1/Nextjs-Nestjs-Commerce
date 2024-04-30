'use client'

import { useContext, useEffect, useState } from 'react'
import api from '@/app/api'
import Link from 'next/link'
import { Context } from '@/context/Provider'
import { Quicksand } from 'next/font/google'

const quickFont = Quicksand({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
})

interface OrdersProps {
  user: any
}

function OrdersClient({ user }: OrdersProps) {
  const [orders, setOrders] = useState<any>([])
  const [viewMore, setViewMore] = useState(true)
  const { setOrderDetails } = useContext(Context) as any

  async function getOrders() {
    const { data } = await api.get(`/order?startIn=${orders.length}`, {
      headers: { Authorization: user.acess_token },
    })
    if (data.length < 5) setViewMore(false)
    setOrders([...orders, ...data])
  }

  useEffect(() => {
    async function get() {
      await getOrders()
    }
    get()
  }, [])

  return (
    <div className='p-10 text-xl flex flex-col gap-10 items-center'>
      <h1 className={`text-3xl ${quickFont.className}`}>My Orders</h1>
      {orders.length == 0 ? (
        <h1>You don&apos;t have orders yet</h1>
      ) : (
        <>
          <div
            className={`grid ${
              orders.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'
            } gap-8 gap-y-10 max-w-[80%] max-md:grid-cols-1`}
          >
            {orders.map((e: any) => (
              <div
                className='border-2 self-start p-5 rounded border-gray-300 bg-gray-100 hover:scale-105'
                key={e.id}
              >
                <p>{`Date: ${e.saleDate
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('/')}`}</p>
                <p>{`Total: R$ ${e.total}`}</p>
                <p>{`Delivered To: ${e.cep} at number: ${e.number}`}</p>
                <Link
                  onClick={() => setOrderDetails(e)}
                  className='text-blue-600 hover:text-blue-500 hover:underline'
                  href={`/orders-details`}
                >
                  View Details
                </Link>{' '}
                {/* don't exists yet */}
              </div>
            ))}
          </div>
          {viewMore && (
            <button
              className='border-2 px-2  py-1 border-gray-700 bg-gray-600 text-white disabled:opacity-70 hover:bg-gray-800'
              onClick={getOrders}
              disabled={!viewMore}
            >
              View More
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default OrdersClient
