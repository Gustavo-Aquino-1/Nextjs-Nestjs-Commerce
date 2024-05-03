'use client'

import { IoIosListBox } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { FormEvent, useContext, useEffect, useState } from 'react'
import OrdersClient from '@/components/OrdersClient'
import { signOut, useSession } from 'next-auth/react'
import FavoritesClient from '@/components/FavoriteClient'
import api from '@/app/api'
import { useRouter } from 'next/navigation'
import { Context } from '@/context/Provider'
import { MdEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";



function Account() {
  const { setCart } = useContext(Context) as any
  const { data: session } = useSession()
  const [page, setPage] = useState('orders')
  const [map, setMap] = useState<any>({})
  const [changingPassword, setChangingPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [pastPassword, setPastPassword] = useState('')
  const [user, setUser] = useState<any>({})
  const router = useRouter()
  useEffect(() => {
    async function getUser() {
      const { data } = await api.get('/auth/user', {
        headers: { Authorization: session?.user.acess_token}
      })
      console.log(data)
      setUser(data)
    }
    if (session?.user.id) {
      setMap({
        orders: <OrdersClient user={session?.user} />,
        favorites: <FavoritesClient user={session?.user} />,
      })
      getUser()
    }
  }, [session])

  const changePassword = async (e: FormEvent) => {
    e.preventDefault()
    if (password != password2) return alert('passwords are not equals')
    try {
      await api.post(
        '/auth/new-password',
        {
          password,
          pastPassword,
        },
        {
          headers: { Authorization: session?.user.acess_token },
        },
      )
      alert('Password changed sucessfully!')
      setChangingPassword(false)
      return
    } catch (error) {
      return alert('Some error ocurred, try again later!')
    }
  }

  return (
    session?.user.id && (
      <div className='flex'>
        <nav className='flex-start bg-gray-200 border-r-2 border-gray-300 p-2 px-10 min-h-screen relative'>
          <ul className='flex flex-col gap-10 mt-5 fixed left-6'>
            <li
              title='Settings'
              onClick={() => setPage('settings')}
              className='cursor-pointer'
            >
              <IoMdSettings size={30} />
            </li>
            <li
              title='Orders'
              onClick={() => setPage('orders')}
              className='cursor-pointer'
            >
              <IoIosListBox size={30} />
            </li>
            <li
              title='Favorites'
              onClick={() => setPage('favorites')}
              className='cursor-pointer'
            >
              <FaHeart size={30} />
            </li>
          </ul>
        </nav>
        <div className='flex-grow p-2'>
          {page != 'settings' ? (
            map[page]
          ) : (
            <div className='p-5 flex flex-col gap-5 items-start'>
              <p className='text-2xl font-light flex items-center gap-2'><FaRegUserCircle /> {session.user.name}</p>
              <p className='text-2xl font-light flex items-center gap-2'><MdEmail/>  {user?.email}</p>
              <button
                onClick={() => setChangingPassword(!changingPassword)}
                className='bg-blue-600 text-white font-semibold px-2 p-1 rounded'
              >
                change my password
              </button>
              {changingPassword ? (
                <form onSubmit={changePassword} className='flex flex-col gap-4'>
                  <label className='flex flex-col gap-2' htmlFor='pastPassword'>
                    Past Password
                    <input
                      required
                      minLength={8}
                      className='border-2 border-gray-300'
                      id='pastPassword'
                      onChange={(e) => setPastPassword(e.target.value)}
                      value={pastPassword}
                      type='password'
                    />
                  </label>

                  <label className='flex flex-col gap-2' htmlFor='password'>
                    Password
                    <input
                      required
                      minLength={8}
                      className='border-2 border-gray-300'
                      id='password'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type='password'
                    />
                  </label>

                  <label className='flex flex-col gap-2' htmlFor='password2'>
                    Repeat Password
                    <input
                      required
                      minLength={8}
                      className='border-2 border-gray-300'
                      id='password2'
                      onChange={(e) => setPassword2(e.target.value)}
                      value={password2}
                      type='password'
                    />
                  </label>

                  <button
                    className='bg-blue-600 text-white font-semibold px-4 p-1 rounded self-start'
                    type='submit'
                  >
                    Confirm
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    signOut()
                    setCart({})
                  }}
                  className='bg-blue-600 text-white font-semibold px-2 p-1 rounded'
                >
                  logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default Account
