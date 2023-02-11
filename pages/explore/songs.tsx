import ExploreSongs from '../../components/explore-songs';
import { ExploreLayout } from "@/layouts/explore";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Songs: NextPageWithLayout = () => {
    return(
        <>
        <Head>
            <title>{`Explore Songs - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}</title>
            <meta name="og:title" content={`Explore Songs - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
            <meta name="description" content="Enter a song and an artist and recieve recommendations based on your likings." />
            <meta name="og:description" content="Enter a song and an artist and recieve recommendations based on your likings." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <ExploreSongs />
        </>
    )
}

Songs.getLayout = (page: ReactElement) => (
    <ExploreLayout>
        {page}
    </ExploreLayout>
)

export default Songs;