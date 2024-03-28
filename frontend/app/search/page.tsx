'use client'

import Products from '@/components/Products'
import { useContext, useState } from 'react'
import api from '../api'
import { Open_Sans } from 'next/font/google'
import { CiHeart } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'
import { Context } from '@/context/Provider'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['600'],
})

function Search() {
  const [name, setName] = useState<string>('')
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()
  const [line, setLine] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [moreOptions, setMoreOptions] = useState(false)
  const [search, setSearch] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const filterProducts = async () => {
    if ((minPrice || 0) > (!maxPrice ? 500000 : maxPrice))
      return alert('The maxPrice should be greater than minPrice')
    try {
      const { data } = await api.get(
        `/product?name=${name}&minPrice=${minPrice || 0}&maxPrice=${
          maxPrice || 500000
        }&line=${line || ''}&type=${type || ''}&take=10`,
      )
      setFilteredData(data)
    } catch (error) {
      alert('Error while fetching data')
    }
  }

  return (
    <div className='pt-20 mb-20 max-w-[80%] m-auto min-h-full flex flex-col gap-10'>
      <div>
        <button onClick={(e) => setMoreOptions(!moreOptions)}>
          More options
        </button>
        <div>
          {moreOptions && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className='min-w-[100%] flex justify-between mt-5 max-md:flex-col max-md:justify-center max-md:gap-5 pb-7'
            >
              <label htmlFor=''>
                <p>Min Price</p>
                <input
                  className='border-2 border-gray-300 p-2 outline-emerald-600 max-md:w-[100%]'
                  type='number'
                  value={minPrice}
                  onChange={(e) => setMinPrice(+e.target.value)}
                />
              </label>

              <label htmlFor=''>
                <p>Max Price</p>
                <input
                  className='border-2 border-gray-300 p-2  outline-emerald-600 max-md:w-[100%]'
                  type='number'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                />
              </label>

              <label htmlFor=''>
                <p>Line</p>
                <select
                  className='p-2  outline-emerald-600 max-md:w-[100%] border-2 border-gray-300'
                  name=''
                  id=''
                  onChange={(e) => setLine(e.target.value)}
                >
                  <option value=''>All</option>
                  <option value='Summer'>Summer</option>
                  <option value='Casual'>Casual</option>
                </select>
              </label>

              <label htmlFor=''>
                <p>Type</p>
                <select
                  className='p-2  outline-emerald-600 max-md:w-[100%] border-2 border-gray-300'
                  name=''
                  id=''
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value=''>All</option>
                  <option value='Adults'>Adults</option>
                  <option value='Kids'>Kids</option>
                </select>
              </label>
            </form>
          )}
        </div>
      </div>
      <div className='flex gap-5'>
        <input
          className='border-2 border-b-2 border-gray-300 w-[85%] py-5 px-1 text-2xl outline-none max-md:w-[70%] max-md:py-3'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          disabled={name.length < 3}
          onClick={filterProducts}
          className='border-2 border-gray w-[15%] rounded-lg bg-emerald-600 text-white max-md:w-[30%] disabled:opacity-50'
        >
          Search
        </button>
      </div>

      {filteredData.length > 0 && (
        <div className='p-4 min-h-[20rem] mb-40'>
          <p
            className={`text-center capitalize text-2xl pb-10 ${openSans.className} hover:underline`}
          >
            Results
          </p>
          <div
            className={`flex justify-between m-auto ${
              filteredData.length >= 3 ? 'max-w-[80%]' : 'max-w-[50%]'
            } max-md:flex-col max-md:max-w-[90%] max-md:justify-center max-md:gap-10 flex-wrap gap-16`}
          >
            {filteredData.map((e: any) => (
              <div
                key={e.id}
                className='flex flex-col items-center justify-center'
              >
                <Link
                  className='scale-95 hover:scale-100 z-0'
                  href={`/product/${e.id}`}
                >
                  <Image src={e.img} width={300} height={300} alt={e.name} />
                </Link>
                <Link
                  href={`/product/${e.id}`}
                  className={`font-bold hover:text-emerald-600 hover:underline text-lg`}
                >
                  {e.name}
                </Link>
                <p
                  className={`z-0 ${openSans.className} text-lg`}
                >{`R$ ${e.price}`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
