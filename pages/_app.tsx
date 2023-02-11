import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { AuthProvider } from '@/contexts/auth/AuthProvider'
import { ModalProvider } from '@/contexts/modal/ModalProvider'
import { ToastProvider } from '@/contexts/toast/ToastProvider'
import { wrapper } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default wrapper.withRedux(App);