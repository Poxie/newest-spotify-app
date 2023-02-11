import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import HomePage from '../components/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        <meta name="og:title" content={process.env.NEXT_PUBLIC_WEBSITE_NAME} />
        <meta name="description" content="Get insights into your spotify experience. View your most liked songs, artists, genres, and get personal listening recommendations." />
        <meta name="og:description" content="Get insights into your spotify experience. View your most liked songs, artists, genres, and get personal listening recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['container']}>
        <HomePage />
      </main>
    </>
  )
}
