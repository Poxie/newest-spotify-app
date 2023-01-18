import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['800', '700', '600', '500'] })

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <style jsx global>{`
      html {
        font-family: ${inter.style.fontFamily}
      }
    `}</style>
    <Navbar />
    <Component {...pageProps} />
    </>
  )
}
