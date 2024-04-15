import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

function SportDivisor() {
  return (
    <div
      className={`bg-slate-800 text-white p-3 overflow-x-hidden flex gap-4 w-full font-bold ${inter.className}`}
    >
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
      <span>SPORT ZONE</span>
    </div>
  )
}

export default SportDivisor