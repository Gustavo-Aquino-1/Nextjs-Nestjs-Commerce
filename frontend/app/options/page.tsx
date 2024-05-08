import Link from 'next/link'
import React from 'react'

function Options() {
  return (
    <div className='flex flex-col p-2'>
      <Link href="/" className='self-end pr-5 pt-2 text-xl hover:text-red-500'>X</Link>
      <nav className='h-full'>
        <ul className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex flex-col gap-20 items-center'>
          <li className='text-2xl font-light hover:scale-105 hover:text-blue-500'>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-2xl font-light hover:scale-105 hover:text-blue-500'>
            <Link href='/search'>Search</Link>
          </li>
          <li className='text-2xl font-light hover:scale-105 hover:text-blue-500'>
            <Link href='/cart'>Cart</Link>
          </li>
          <li className='text-2xl font-light hover:scale-105 hover:text-blue-500'>
            <Link href='/account'>Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Options
