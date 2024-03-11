'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function ButtonLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default ButtonLogout
