import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      // type of session.user (in nextAuthOptions)
      id: number
      name: string
      role: string
      acess_token: string
      refresh_token: string
    }
  }
}
