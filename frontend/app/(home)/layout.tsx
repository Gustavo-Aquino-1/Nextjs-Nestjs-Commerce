import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GAX | Home',
  description:
    'The GAX is a Ecommerce from the future. Here we work with quality so have fun!!',
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
