import Image, { StaticImageData } from 'next/image'

interface CardProps {
  img: StaticImageData
  alt: string
  className?: string
}

function Card({ img, alt, className }: CardProps) {
  return (
    <div>
      <Image
        className={
          'w-[320px] h-[550px] hover:cursor-pointer hover:border-4 hover:border-collapse border-white-500 ' + className
        } // remind the space
        src={img}
        alt={alt}
        width={300}
        height={300}
      />
    </div>
  )
}

export default Card
