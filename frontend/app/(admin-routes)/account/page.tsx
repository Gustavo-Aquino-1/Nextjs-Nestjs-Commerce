'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { RiFileListLine } from 'react-icons/ri'
import { MdFavorite } from 'react-icons/md'
import { MdOutlinePersonOutline } from 'react-icons/md'

interface MyAccountProps {
  // params: { id: string }
  // searchParams: { [key: string]: string | string[] | undefined }
  // user?: any
}

function MyAccount() {
  const [accountOptions, setAccountOptions] = useState(false)
  return (
    <div className='p-10 flex flex-col gap-10'>
      <h1 className='text-4xl'>My account</h1>
      {/* <div>
        <div className='flex gap-2 text-xl'>
          <p>Hey,</p>
          <p className='font-semibold'>{user.name}</p>
        </div>
      </div> */}
      <ul className='flex flex-col text-2xl gap-5'>
        <li className=''>
          <h1
            className='hover:cursor-pointer hover:text-slate-600 flex items-center gap-2'
            onClick={() => setAccountOptions(!accountOptions)}
          >
            My Account
            <MdOutlinePersonOutline size={30} />
          </h1>
          {accountOptions && (
            <ul className='ml-4 flex flex-col gap-1 mt-1'>
              <li>
                <Link className='hover:text-slate-600' href='/home'>
                  Change password
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            className='hover:text-slate-600 flex items-center gap-2'
            href='/orders'
          >
            My Orders
            <RiFileListLine />
          </Link>
        </li>
        <li>
          <Link
            className='hover:text-slate-600 flex items-center gap-2'
            href='/favorites'
          >
            My Favorites
            <MdFavorite />
          </Link>
        </li>

        <button
          onClick={async () => await signOut()}
          className='self-start border-2 px-4 border-black rounded hover:font-semibold bg-black text-white py-1 '
        >
          Logout
        </button>
      </ul>
    </div>
  )
}

export default MyAccount
