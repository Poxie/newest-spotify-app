import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { wrapper } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default wrapper.withRedux(App);