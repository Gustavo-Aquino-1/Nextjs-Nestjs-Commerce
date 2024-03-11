import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      // type of session.user (in nextAuthOptions)
      id: number
      name: string
      email: string
    }
  }
}
