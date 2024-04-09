'use client'

import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function AuthPage() {
  const [area, setArea] = useState('login')
  return (
    <div className='flex flex-col items-center absolute top-1/2 transform -translate-y-1/2 left-0 right-0 w-full gap-5'>
      <div className='flex min-w-[25%] text-xl cursor-pointer max-lg:min-w-[60%]  max-md:min-w-[75%]'>
        <div
          onClick={() => setArea('login')}
          className='w-[50%] text-center flex flex-col gap-1'
        >
          <span className=''>Login</span>
          <div
            className={`h-[0.15rem] bg-${
              area == 'login' ? 'black' : 'gray-300'
            }`}
          ></div>
        </div>
        <div
          onClick={() => setArea('create')}
          className='w-[50%] text-center flex flex-col gap-1'
        >
          <span className=''>Create Account</span>
          <div
            className={`h-[0.15rem] bg-${
              area == 'create' ? 'black' : 'gray-300'
            }`}
          ></div>
        </div>
      </div>
      <div className='min-w-[25%] max-w-[25%] max-lg:min-w-[60%] max-lg:max-w-[60%] flex flex-col gap-5 max-md:min-w-[75%] max-md:max-w-[75%]'>
        {area == 'login' ? <Login /> : <SignUp />}
        <p className='text-gray-500 text-sm'>
          By continuing, I confirm that I have read and accept the{' '}
          <Link className='font-bold hover:underline' href='/home'>
            Terms and Conditions.
          </Link>{' '}
          and the{' '}
          <Link className='font-bold hover:underline' href='/home'>
            Privacy Policy.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
