import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // have to import to tailwind works because it does the import in this file
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Provider from '@/context/Provider'
import SmallAlerts from '@/components/SmallAlerts'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GAX | Only the best',
  description:
    'The GAX is a Ecommerce from the future. Here we work with quality so have fun!!',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Header />
      <body className={inter.className}>
        <div className='mt-[74px]'>
          <NextAuthSessionProvider>
            <Provider>{children}</Provider>
          </NextAuthSessionProvider>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
