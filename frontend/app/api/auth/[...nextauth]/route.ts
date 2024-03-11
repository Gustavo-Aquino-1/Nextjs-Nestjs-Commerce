import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import api from '@/app/api'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      }, // can be this
      async authorize(credentials, req) {
        try {
          const { data } = await api.post('/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          })
          return data
        } catch (error) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
