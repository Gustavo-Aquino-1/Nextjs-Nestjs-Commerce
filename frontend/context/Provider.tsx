'use client'

import useLocalStorage from '@/hooks/useLocalStorage'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'

const Context = createContext({})

export default function Provider({ children }: PropsWithChildren) {
  const [cart, setCart] = useLocalStorage('cart', {})
  const [total, setTotal] = useLocalStorage('total', 0)
  const [orderDetails, setOrderDetails] = useLocalStorage('orderDetails', {})

  const addToCart = (product: any, size: string) => {
    const key = `${product.id}${size}`
    const cpCart = { ...cart }
    if (cpCart[key]) cpCart[key].quantity += 1
    else
      cpCart[key] = {
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        size,
        quantity: 1,
      }
    setCart({ ...cpCart })
  }

  const removeFromCart = (product: any, size: string) => {
    const key = `${product.id}${product.size}`
    const cpCart = { ...cart }
    cpCart[key].quantity -= 1
    if (cpCart[key].quantity == 0) delete cpCart[key]
    setCart({ ...cpCart })
  }

  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      total,
      setTotal,
      setCart,
      orderDetails,
      setOrderDetails
    }),
    [cart, addToCart, removeFromCart, total, setTotal, setCart, orderDetails, setOrderDetails],
  )
  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export { Context }
