'use client'

import React,{ useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function MyAccount() {
  const [accountOptions, setAccountOptions] = useState(false)
  return (
    <div className='p-10'>
      <ul className='flex flex-col text-xl gap-5'>
        <li className=''>
          <h1
            className='hover:cursor-pointer hover:text-blue-400'
            onClick={() => setAccountOptions(!accountOptions)}
          >
            My Account
          </h1>
          {accountOptions && (
            <ul className='ml-4 flex flex-col gap-1 mt-1'>
              <li>
                <Link className='hover:text-blue-300' href='/home'>
                  My Infomations
                </Link>
              </li>
              <li>
                <Link className='hover:text-blue-300' href='/home'>
                  Change email
                </Link>
              </li>
              <li>
                <Link className='hover:text-blue-300' href='/home'>
                  Change password
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link className='hover:text-blue-400' href='/orders'>
            My Orders
          </Link>
        </li>
        <li>
          <Link className='hover:text-blue-400' href='/favorites'>
            My Favorites
          </Link>
        </li>

        <button onClick={async () => await signOut()} className='self-start border-2 px-4 border-black rounded hover:bg-black hover:text-white'>logout</button>
      </ul>
    </div>
  )
}

export default MyAccount