'use client'

import React, { useEffect, useState } from 'react'

function useLocalStorage(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const data = JSON.parse(localStorage.getItem(key) || 'null')
    return data || initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export default useLocalStorage
