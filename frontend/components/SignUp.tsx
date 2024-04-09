'use client'

import api from '@/app/api'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (password != passwordConfirmation) {
      alert('The passwords are not equals.')
      return
    }

    try {
      const { data } = await api.post('/auth/user', {
        name,
        email,
        password,
      })
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        console.log(res)
        return
      }

      router.replace('/home')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      {error && (
        <p className='text-center font-semibold text-red-400 capitalize'>
          {error}
        </p>
      )}
      <label className='flex flex-col gap-1' htmlFor='name'>
        Name
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border border-black py-3 px-2'
          required
          minLength={2}
        />
      </label>

      <label className='flex flex-col gap-1' htmlFor='email'>
        Email
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-black py-3 px-2'
          required
        />
      </label>
      <label className='flex flex-col gap-1' htmlFor='password'>
        Password
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-black py-3 px-2'
          required
          minLength={8}
        />
      </label>
      <label className='flex flex-col gap-1' htmlFor='passwordConfirmation'>
        Password Confirmation
        <input
          type='password'
          id='passwordConfirmation'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className='border border-black py-3 px-2'
          required
          minLength={8}
        />
      </label>
      <label className='flex gap-4' htmlFor='agree'>
        <input className='scale-150' required type='checkbox' id='agree' />
        <div className='flex gap-1'>
          <p>I Accept all</p>
          <Link className='font-bold hover:underline' href='/'>
            Terms.
          </Link>
        </div>
      </label>
      <button
        className='border border-black py-3 bg-black text-white text-lg font-semibold hover:font-bold'
        type='submit'
      >
        CREATE ACCOUNT
      </button>
    </form>
  )
}

export default SignUp
