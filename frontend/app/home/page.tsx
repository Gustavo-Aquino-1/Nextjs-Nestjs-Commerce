import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/components/ButtonLogout'
import Card from '@/components/Card'
import Products from '@/components/Products'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import soccer from '@/public/Soccer.png'
import basketball from '@/public/basketball.jpg'
import f1 from '@/public/f1.png'
import bgDiscount from '@/public/bg-discount.jpg'

export default async function Home() {
  return (
    <div className='flex flex-col gap-10 pb-20'>
      <div
        style={{
          background: 'linear-gradient(to top,white,#87CE9A)',
        }}
        className='bg-black p-4 h-[20rem] flex flex-col justify-center items-center'
      >
        <p className='text-4xl font-extralight text-emerald-700'>20%</p>
        <p className='text-xl font-semibold text-emerald-700'>
          Every T-shirt in the GAX
        </p>
      </div>
      <div>
        <Products filters={{ line: 'Summer', take: 3 }} title='Summer line' />
        <Products filters={{ line: 'Casual', take: 3 }} title='Casual line' />
      </div>
      <div
        style={{
          background: 'linear-gradient(to top, gray, lightgray)',
        }}
        className='bg-black p-28'
      >
        <div className='flex justify-between w-[100%] m-auto'>
          <Card img={soccer} alt='Soccer' />
          <Card
            img={basketball}
            alt='Basktball'
            className='w-[320px] h-[550px] scale-110'
          />
          <Card img={f1} alt='f1' />
        </div>
      </div>
      <div>
        <Products filters={{ line: 'Casual', take: 3 }} title='Casual line' />
        <Products filters={{ line: 'Summer', take: 3 }} title='Summer line' />
      </div>
    </div>
  )
  // return (
  //   <div>
  //     <p>{session?.user?.name}</p>
  //   </div>
  // )
}

// style={{ backgroundImage: "url('https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448749.jpg')", backgroundSize: 'cover'}}
