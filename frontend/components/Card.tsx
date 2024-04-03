'use client'

import Image, { StaticImageData } from 'next/image'
import { useRef, useState } from 'react'

interface CardProps {
  img: StaticImageData[]
  alt: string
  className?: string
}

function Card({ img, alt, className }: CardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div>
      <Image
        className={`max-w-[320px] h-[550px] hover:cursor-pointer hover:border-2 hover:border-collapse border-white-500 ${className}`} // remind the space
        src={hover ? img[0] : img[1]}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        alt={alt}
        width={300}
        height={300}
      />
    </div>
  )
}

export default Card
