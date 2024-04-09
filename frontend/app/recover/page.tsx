'use client'

import React, { FormEvent, useState } from 'react'
import api from '../api'

function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const recoverPassword = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.get('/recover-password?email=' + email)
      setEmailSent(true)
    } catch (error) {
      setEmailSent(false)
      alert('Some error ocurred. Try again later!')
    }
  }

  return (
    <div className='m-auto pt-20 min-w-[25%] max-w-[25%] text-xl max-lg:min-w-[60%] max-lg:max-w-[60%]  max-md:min-w-[75%] max-md:max-w-[75%]'>
      <form className='flex flex-col gap-5' onSubmit={recoverPassword}>
        <label className='flex flex-col gap-2' htmlFor='email'>
          Please insert your email:
          <input
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            required
            disabled={emailSent}
            className='border border-gray-800 py-3 w-full px-2'
          />
        </label>

        <button disabled={emailSent} type='submit' className='bg-black text-white rounded py-2 font-semibold hover:font-extrabold disabled:cursor-not-allowed'>Send Email</button>
      </form>

      {emailSent && (
        <div className='mt-10'>An email was sent to <strong>{email}</strong>.</div>
      )}
    </div>
  )
}

export default RecoverPassword
