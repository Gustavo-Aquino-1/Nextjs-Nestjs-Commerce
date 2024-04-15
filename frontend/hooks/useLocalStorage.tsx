import { useEffect, useState } from 'react'

function useLocalStorage(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    if (typeof window != 'undefined') {
      const storedData = localStorage.getItem(key)
      return storedData ? JSON.parse(storedData) : initialState
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default useLocalStorage
