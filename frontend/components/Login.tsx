'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(true)
      return
    }

    router.back()
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={async (e) => {
      e.preventDefault()
      await handleSubmit()
    }}>
      {error && <p className='text-center font-semibold text-red-400'>The Email or Password is wrong.</p>}
      <label className='flex flex-col gap-2' htmlFor="email">
        Email
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-800 py-3'
        />
      </label>
      <label className='flex flex-col gap-2' htmlFor="password">
        Password
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-800 py-3'
        />
      </label>
      <button
        className='border-2 border-gray-400 py-3 bg-black text-white text-lg font-semibold hover:font-bold'
        type='submit'
      >
        LOGIN
      </button>
      
    </form>
  )
}

export default Login
