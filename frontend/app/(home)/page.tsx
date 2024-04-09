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
import classes from './home.module.css'
import basketballHover from '@/public/basketballHover.jpeg'
import f1Hover from '@/public/f1Hover.jpeg'
import soccerHover from '@/public/soccerHover.jpeg'
import { Space_Grotesk } from '@next/font/google'
import { GiFireZone } from "react-icons/gi";


const sportsFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
})

export default async function Home() {
  return (
    <div className='flex flex-col gap-10 pb-20'>
      <div
        className={`bg-black p-4 h-[40rem] flex flex-col justify-center items-center ${classes.sale} max-[1150px]:h-[30rem] max-md:h-[800px] max-sm:h-[500px]`}
      >
      </div>
      <div>
        <Products filters={{ line: 'Summer', take: 3 }} title='Summer line' />
        <Products filters={{ line: 'Casual', take: 3 }} title='Casual line' />
      </div>
      <div style={{ background: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3jL3rIvLAaukMrIJrwhpq5pCrJf2wtW0H9mYLCMt92CPYggJl6bV3rnBkOiUBEOMVpI&usqp=CAU')", backgroundSize: 'cover'}} className='bg-black p-28 flex flex-col gap-20'>
        <div className='flex gap-5 justify-center'>
          <h1 className={`text-white text-center text-4xl ${sportsFont.className}`}>
            SPORTS ZONE
          </h1>
          <span><GiFireZone color='white' size={40} /></span>
        </div>
        <div className='flex justify-between gap-10 flex-wrap w-[100%] m-auto max-md:flex-col max-md:items-center'>
          <Card img={[soccer, soccerHover]} alt='Soccer' />
          <Card
            img={[basketball, basketballHover]}
            alt='Basktball'
            className='lg:scale-110'
          />
          <Card img={[f1, f1Hover]} alt='f1' />
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
