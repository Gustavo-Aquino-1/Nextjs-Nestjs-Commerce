'use client'

import api from '@/app/api'
import { FormEvent, useEffect, useState } from 'react'

interface RateModalProps {
  modalOpen: boolean
  setModalOpen: any
  productId: number
  user: any
}

function RateModal({
  modalOpen,
  setModalOpen,
  productId,
  user,
}: RateModalProps) {
  const [loading, setLoading] = useState(true)
  const [rated, setRated] = useState(false)
  const [rate, setRate] = useState(1)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setLoading(true)
    const isRated = async () => {
      const { data } = await api.get(`/feedback/${productId}`, {
        headers: { Authorization: user.acess_token },
      })
      if (!data.message.includes('not')) {
        setRated(true)
      } else setRated(false)
      setLoading(false)
    }
    isRated()
  }, [modalOpen])

  const rateProduct = async (e: FormEvent) => {
    e.preventDefault()
    await api.post(
      '/feedback',
      {
        productId: +productId,
        rate: +rate,
        description,
      },
      { headers: { Authorization: user.acess_token } },
    )
    setRated(true)
  }

  return (
    <div>
      {modalOpen && (
        <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center z-50'>
          <div className='flex flex-col gap-2 justify-center p-5 rounded-md bg-slate-800 text-white text-xl shadow-lg shadow-gray-800'>
            <p
              onClick={() => setModalOpen(false)}
              className='self-end hover:cursor-pointer font-bold opacity-80 hover:opacity-100'
            >
              X
            </p>

            <form onSubmit={rateProduct} className='flex flex-col gap-10'>
              {rated ? (
                <p className='font-bold'>You already rated this product</p>
              ) : (
                <p className='font-bold'>Be Honest</p>
              )}
              <label className='flex flex-col gap-2' htmlFor=''>
                Rate:
                <select
                  value={rate}
                  onChange={(e) => setRate(e.target.value as any)}
                  disabled={rated}
                  className='text-black p-1 outline-none rounded-sm  disabled:cursor-not-allowed'
                >
                  {[1, 2, 3, 4, 5].map((e) => (
                    <option key={e} value={e}>
                      {`${e} ${'★'.padEnd(e, '★')}`}
                    </option>
                  ))}
                </select>
              </label>
              <label className='flex flex-col gap-2' htmlFor=''>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={rated}
                  placeholder='Describe the product'
                  className='p-2 outline-none text-black rounded-sm disabled:cursor-not-allowed'
                  minLength={3}
                  required
                />
              </label>
              <button
                className={`bg-white text-blue-800 py-1 rounded disabled:cursor-not-allowed ${
                  !rated ? 'hover:bg-red-600 hover:text-white' : ''
                }`}
                disabled={rated}
                type='submit'
              >
                Rate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default RateModal
