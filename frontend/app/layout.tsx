import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // have to import to tailwind works because it does the import in this file
import Header from '@/components/Header'
import Provider from '@/context/Provider'

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
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Provider>
            <Header />
            <div className='mt-[74px]'>{children}</div>
          </Provider>
        </NextAuthSessionProvider>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
