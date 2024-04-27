'use client'

import api from '@/app/api'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'

function useAxiosAuth() {
  const { data: session } = useSession()
  const refreshToken = useRefreshToken()

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = session?.user.acess_token
        }
        return config
      },
      (err) => Promise.reject(err),
    )

    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevRequest = err.config
        if (err.response.status == 401 && !prevRequest.sent) {
          prevRequest.sent = true
          const result = await refreshToken() // this will update the field acess_token look deep in useRefreshToken
          prevRequest.headers['Authorization'] = session?.user.acess_token
          if (result) {
            return api(prevRequest)
          }
        }
        return Promise.reject(err)
      },
    )

    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [refreshToken, session])

  return api
}

export default useAxiosAuth
