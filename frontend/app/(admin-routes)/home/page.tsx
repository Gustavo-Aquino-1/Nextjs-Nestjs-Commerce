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

export default async function Home() {
  return (
    <div className='flex flex-col gap-10 pb-20'>
      <div className='bg-red-600 p-4 h-[23rem] flex flex-col justify-center items-center'>
        <p className='text-4xl text-white font-extralight'>20%</p>
        <p className='text-xl font-semibold'>Every T-shirt in the GAX</p>
      </div>
      <div>
        <Products line='Summer' />
        <Products line='Casual' />
      </div>
      <div className='bg-black p-28'>
        <div className='flex justify-between w-[80%] m-auto'>
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
        <Products line='Casual' />
        <Products line='Summer' />
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
