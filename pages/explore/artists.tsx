import ExploreArtists from '../../components/explore-artists';
import { ExploreLayout } from "@/layouts/explore";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Artists: NextPageWithLayout = () => {
    return(
        <>
        <Head>
            <title>{`Explore Artists - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}</title>
            <meta name="og:title" content={`Explore Artists - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
            <meta name="description" content="Get insightful information about an artist and artists similar to them." />
            <meta name="og:description" content="Get insightful information about an artist and artists similar to them." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <ExploreArtists />
        </>
    )
}

Artists.getLayout = (page: ReactElement) => (
    <ExploreLayout>
        {page}
    </ExploreLayout>
)

export default Artists;