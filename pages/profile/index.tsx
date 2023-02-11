import Head from "next/head";
import ProfilePage from '../../components/profile';

export default function Profile() {
    return(
        <>
        <Head>
            <title>
                {`Profile - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}
            </title>
            <meta name="og:title" content={`Profile - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
            <meta name="description" content="View your most listened songs and artists on Spotify." />
            <meta name="og:description" content="View your most listened songs and artists on Spotify." />
        </Head>
        <main>
            <ProfilePage />
        </main>
        </>
    )
}