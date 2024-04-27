'use client'

import api from '@/app/api'
import { useEffect, useState } from 'react'

interface AvaliationsProps {
  productId: number
}

function Avaliations({ productId }: AvaliationsProps) {
  const [avaliations, setAvaliations] = useState<any>([])
  const [notMoreAvaliations, setNotMoreAvaliations] = useState(false)

  const getAvaliations = async () => {
    const { data } = await api.get(
      `/feedback/rates/${productId}?skip=${avaliations.length}`,
    )
    if (data.length < 5) setNotMoreAvaliations(true)
    setAvaliations([...data, ...avaliations])
  }

  useEffect(() => {
    getAvaliations()
  }, [])

  return (
    <div className='min-w-[70%] max-w-[70%] max-md:min-w-[90%] max-md:max-w-[90%] m-auto text-xl '>
      <h1 className='font-bold text-xl'>What people think about this product ?</h1>
      <div className='flex gap-5 overflow-x-auto max-md:overflow-x-scroll scrollbar-thin py-4'>
        {avaliations.map((e: any) => (
          <div
            className='border border-gray-300 p-2 min-w-[250px] max-w-[250px] max-h-[120px] overflow-y-scroll scrollbar-thin border-r-4 border-l-4'
            key={e.userId}
          >
            <p>
              <strong>{e.user.name.split(' ')[0]}</strong> -{' '}
              <span className='text-yellow-700'>{'★'.padEnd(e.rate, '★')}</span>
            </p>
            <p className='ml-1 first-letter:capitalize'>
              {e.description} lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Veritatis repellendus consequuntur natus officia
              quos eum repellat et, dolorum, rem, dolore molestias quas aliquam
              exercitationem fugiat atque inventore reiciendis a aperiam.
            </p>
          </div>
        ))}
      </div>

      {!notMoreAvaliations && (
        <button
          className='mt-5 disabled:cursor-not-allowed bg-emerald-950 text-white px-2 p-1 rounded text-base'
          disabled={notMoreAvaliations}
          onClick={getAvaliations}
        >
          View More
        </button>
      )}
    </div>
  )
}

export default Avaliations
