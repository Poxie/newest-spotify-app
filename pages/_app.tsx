import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { AuthProvider } from '@/contexts/auth/AuthProvider'
import { ModalProvider } from '@/contexts/modal/ModalProvider'
import { ToastProvider } from '@/contexts/toast/ToastProvider'
import { wrapper } from '@/redux/store'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  
  return(
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <Navbar />
          {getLayout(<Component {...pageProps} />)}
          <Footer />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default wrapper.withRedux(App);