import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { CiSearch } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'

export default async function Header() {
  return (
    <header className='flex justify-between w-full p-[1rem] fixed bg-white border-gray-300 border-b-2 z-50'>
      <p className='text-pretty text-xl'>GAX</p>
      <div className='flex gap-4'>
        <CiSearch size={'2rem'} />
        <IoCartOutline size={'1.8rem'} />
        <FaUser size={'1.8rem'} />
      </div>
    </header>
  )
}
