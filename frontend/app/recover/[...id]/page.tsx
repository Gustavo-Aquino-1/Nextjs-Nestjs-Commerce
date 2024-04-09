'use client'

import api from '@/app/api'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (passwordUpdated) {
      setTimeout(() => {
        router.push('/login')
      }, [3000])
    }
  }, [passwordUpdated])

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    if (password != passwordConfirmation)
      return alert('Passwords should be equals')
    try {
      await api.post(`/recover-password/${params.id[0]}/${params.id[1]}`, {
        password,
      })
      setPasswordUpdated(true)
    } catch (error) {
      alert('Some error ocurred. Try again later!')
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className='m-auto pt-20 min-w-[25%] max-w-[25%] text-xl max-lg:min-w-[60%] max-lg:max-w-[60%]  max-md:min-w-[75%] max-md:max-w-[75%]'>
      <h1 className='mb-5 text-2xl font-semibold'>Reset your password</h1>
      <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-2 font-semibold' htmlFor='password'>
          Password
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-800 py-3 px-2'
            minLength={8}
            required
          />
        </label>
        <label className='flex flex-col gap-2 font-semibold' htmlFor='password'>
          Password Confirmation
          <input
            type='password'
            id='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className='border border-gray-800 py-3 px-2'
            minLength={8}
            required
          />
        </label>
        <button
          disabled={loading ? loading : passwordUpdated}
          className='bg-black text-white rounded py-2 font-semibold hover:font-extrabold disabled:cursor-not-allowed'
          type='submit'
        >
          Reset Password
        </button>
      </form>

      {passwordUpdated && (
        <p className='text-xl mt-10 font-semibold'>
          Your password was updated sucessfully!
        </p>
      )}
    </div>
  )
}

export default ResetPassword
