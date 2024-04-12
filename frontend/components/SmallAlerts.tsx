'use client'

import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})


function SmallAlerts() {
  const [shipping, setShipping] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShipping(!shipping)
    }, [3000])
  }, [shipping])

  return (
    <div
      className={`h-[40px] bg-white flex justify-center items-center ${inter.className} font-bold`}
    >
      {shipping ? 'FREE SHIPPING ON ORDERS OVER R$ 200' : 'FREE AND EASY RETURNS'}
    </div>
  )
}

export default SmallAlerts
