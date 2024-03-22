import Link from 'next/link'
import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { Cedarville_Cursive } from '@next/font/google'

const cedarville = Cedarville_Cursive({
  subsets: ['latin'],
  weight: ['400'],
})

function Footer() {
  return (
    <footer className='bg-black text-white p-10 max-md:p-5'>
      <h1 className={`self-start ${cedarville.className} text-2xl`}>Gax</h1>
      <div className='flex justify-between max-w-[80%] m-auto max-md:flex-wrap max-md:gap-2 max-md:justify-center'>
        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2'>
            <Link href='/home'>About us</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>Contact</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>Group GAX</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>Work with us</Link>
          </li>
        </ul>

        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2'>
            <Link href='/home'>GAX Policies</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>Privacy Policy</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>Delivery Policy</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/home'>GAX card Policy</Link>
          </li>
        </ul>

        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2 text-center'>
            <Link href='/home'>We are in</Link>
          </li>
          <li className='flex gap-5 max-md:flex-wrap'>
            <Link className='hover:scale-105' href='/home'>
              <AiFillInstagram size={30} />
            </Link>
            <Link className='hover:scale-105' href='/home'>
              <FaFacebook size={30} />
            </Link>
            <Link className='hover:scale-105' href='/home'>
              <FaLinkedin size={30} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
