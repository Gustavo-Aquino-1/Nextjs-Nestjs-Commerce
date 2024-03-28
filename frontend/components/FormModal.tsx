'use client'

import { useState } from 'react'

function FormModal() {
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')
  const [paymentType, setPaymentType] = useState('')
  return (
    <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center backdrop-blur-lg'>
      <form className='flex flex-col gap-10 p-10 rounded-lg z-50 bg-slate-800 w-[50%]'>
        <label htmlFor='cep'>
          <p className='mb-2 text-white text-lg font-semibold'>Cep</p>
          <input
            id='cep'
            type='text'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        <label htmlFor='number'>
          <p className='mb-2 text-white text-lg font-semibold'>Number</p>
          <input
            id='number'
            type='text'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <label htmlFor='paymentType'>
          <p className='mb-2 text-white text-lg font-semibold'>Payment Type</p>
          <select
            id='paymentType'
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className='px-10 py-1'
          >
            {['pix', 'debit', 'credit'].map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <button className='self-start bg-slate-700 text-white px-10 py-1 rounded-md' type='submit'>
          Pay
        </button>{' '} {/* self-start when flex-col align in line of the x otherway in line of y*/}
      </form>
    </div>
  )
}

export default FormModal
