import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { AuthProvider } from '@/contexts/auth/AuthProvider'
import { wrapper } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}

export default wrapper.withRedux(App);