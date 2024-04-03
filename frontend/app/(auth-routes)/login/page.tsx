'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      console.log(res)
      return
    }

    router.back()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}

export default Login
