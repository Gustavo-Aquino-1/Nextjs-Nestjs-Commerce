import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import api from '@/app/api'
import 'dotenv/config'
import nextAuthOptions from '@/lib/nextAuthOptions'

const { NEXTAUTH_SECRET } = process.env


const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
