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
    <footer className='bg-slate-950 text-white p-10 max-md:p-5'>
      <h1 className={`self-start ${cedarville.className} text-2xl`}>Gax</h1>
      <div className='flex justify-between max-w-[80%] m-auto max-md:flex-wrap max-md:gap-2 max-md:justify-center'>
        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2'>
            <Link href='/'>About us</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>Contact</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>Group GAX</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>Work with us</Link>
          </li>
        </ul>

        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2'>
            <Link href='/'>GAX Policies</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>Privacy Policy</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>Delivery Policy</Link>
          </li>
          <li className='hover:underline'>
            <Link href='/'>GAX card Policy</Link>
          </li>
        </ul>

        <ul className='flex flex-col'>
          <li className='font-bold text-lg pb-2 text-center'>
            <Link href='/'>We are in</Link>
          </li>
          <li className='flex gap-5 max-md:flex-wrap'>
            <Link className='hover:scale-105' href='/'>
              <AiFillInstagram size={30} />
            </Link>
            <Link className='hover:scale-105' href='/'>
              <FaFacebook size={30} />
            </Link>
            <a className='hover:scale-105' href='https://linkedin.com/in/gustavo--aquino' target="_blank">
              <FaLinkedin size={30} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
