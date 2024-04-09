import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'

export default async function Header() {
  return (
    <header className='flex justify-between w-full p-[1.5rem] fixed top-0 lg:bg-[#141414] md:bg-[#141414] bg-black text-white z-50'>
      <Link href='/' className='text-pretty text-xl'>
        GAX
      </Link>
      <div className='flex gap-4'>
        <Link href='/search'>
          <CiSearch size={'2rem'} />
        </Link>
        <Link href='/cart'>
          <IoCartOutline size={'1.8rem'} />
        </Link>
        <Link href='/account'>
          <FaUser size={'1.8rem'} />
        </Link>
      </div>
    </header>
  )
}
