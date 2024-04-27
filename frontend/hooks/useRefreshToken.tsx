import api from '@/app/api'
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'

function useRefreshToken() {
  const { data: session } = useSession()

  const refreshToken = async (n = 0) => {
    n += 1
    if (session) {
      try {
        const { data } = await api.post('/auth/refresh', {
          refresh: session?.user.acess_token,
        })
        session.user.acess_token = data.refreshToken
        console.log('refreshed')
        return true
      } catch (error) {
        await signOut()
        return
      }
    }
    if(n > 50) {
      console.log(typeof session)
      await signOut()
      return
    }

    console.log(n)

    return refreshToken(n)
  }

  return refreshToken
}

export default useRefreshToken
