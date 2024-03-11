import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/components/ButtonLogout'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'

export default async function MyAccount() {
  const session = await getServerSession(nextAuthOptions)
  // console.log(session)

  return (
    <div>
      <p>{session?.user?.name}</p>
      <ButtonLogout />
    </div>
  )
}
