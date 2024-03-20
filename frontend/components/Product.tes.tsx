import Image from 'next/image'
import React from 'react'

interface ProductProps {
  img: string
}

function Product({ img }: ProductProps) {
  return (
    <div className='text-center'>
      <Image
        src={img}
        alt=''
        className='w-[200px] h-[200px]'
        width={150}
        height={150}
        // fill
        />
      <p>Product example</p>
      <p>R$ {30 - 10}</p>
    </div>
  )
}

export default Product
