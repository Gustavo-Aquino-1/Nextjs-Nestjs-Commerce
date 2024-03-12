import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import api from '@/app/api'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const { NEXTAUTH_SECRET } = process.env

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
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token // this token will go to inside of session
    },
    async session({ session, token }) {
      // look now i receive the token of jwt
      session.user = token.user as any
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
