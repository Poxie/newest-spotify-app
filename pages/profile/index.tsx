import Head from "next/head";
import ProfilePage from '../../components/profile';

export default function Profile() {
    return(
        <>
        <Head>
            <title>
                Profile
            </title>
            <meta name="description" content="View your most listened songs and artists on Spotify." />
        </Head>
        <main>
            <ProfilePage />
        </main>
        </>
    )
}