'use client'

import Products from '@/components/Products'
import { useContext, useState } from 'react'
import api from '../api'
import { Open_Sans } from 'next/font/google'
import { CiHeart } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'
import { Context } from '@/context/Provider'
import { IoSearchOutline } from 'react-icons/io5'
import DropDown from '@/components/DropDown'

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
  const [focus, setFocus] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filterProducts = async (e) => {
    setSubmitted(true)
    e.preventDefault()
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
    <div
      onClick={(e) =>
        !String(e.target.className).includes('dropdown') && setFocus(false)
      }
      className='pt-20 mb-20 max-w-[80%] m-auto min-h-full flex flex-col gap-10'
    >
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
                  className='border-2 border-gray-300 p-2 outline-slate-600 max-md:w-[100%]'
                  type='number'
                  value={minPrice}
                  onChange={(e) => setMinPrice(+e.target.value)}
                />
              </label>

              <label htmlFor=''>
                <p>Max Price</p>
                <input
                  className='border-2 border-gray-300 p-2  outline-slate-600 max-md:w-[100%]'
                  type='number'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(+e.target.value)}
                />
              </label>

              <label htmlFor=''>
                <p>Line</p>
                <select
                  className='p-2  outline-slate-600 max-md:w-[100%] border-2 border-gray-300'
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
                  className='p-2  outline-slate-600 max-md:w-[100%] border-2 border-gray-300'
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
      <div>
        <form className='' onSubmit={filterProducts}>
          <div className='flex'>
            <input
              className='border-2 border-b-2 rounded-l-lg border-gray-300  py-5 px-1 text-2xl outline-none max-md:py-3 inline w-[85%] max-md:w-[70%] dropdown'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={3}
              required
              name='search_input'
              onFocus={(e) => {
                setFocus(true), setSubmitted(false)
              }}
              autoFocus
              // onBlur={(e) => setFocus(false)}
              // id='search_products' cannot has id equal to list id
              // list='search_products'
            />
            {/* <datalist id='search_products'>
              <option value='Air Max Plus Drift'></option>
              <option value='Air Max 90'></option>
              <option value='Adi2000'></option>
            </datalist> */}

            <button
              type='submit'
              className='w-[10%] rounded-r-lg bg-blue-600 text-white max-md:w-[30%] flex justify-center items-center'
            >
              <IoSearchOutline size={35} />
            </button>
          </div>

          {!submitted && (
            <DropDown
              setName={setName}
              focus={focus}
              setFocus={setFocus}
              name={name}
            />
          )}
        </form>
      </div>

      {filteredData.length > 0 && (
        <div className='min-h-[20rem] mt-20 mb-40'>
          <div
            className={`flex flex-wrap gap-[4rem] max-md:flex-col max-md:justify-center max-md:gap-10`}
          >
            {filteredData.map((e: any) => (
              <div
                key={e.id}
                className='flex flex-col items-center justify-center gap-2 hover:scale-105'
              >
                <Link className='z-0' href={`/product/${e.id}`}>
                  <Image src={e.img} width={300} height={300} alt={e.name} />
                </Link>
                <Link
                  href={`/product/${e.id}`}
                  className={`font-semibold hover:font-semibold text-lg text-gray-600`}
                >
                  {e.name}
                </Link>
                <div className='pb-4'>
                  <p className='text-gray-500 line-through'>{`R$ ${
                    e.price + e.price * 0.2
                  }`}</p>
                  <p
                    className={`z-0 ${openSans.className} text-lg text-[#bfa75d]`}
                  >{`R$ ${e.price}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
