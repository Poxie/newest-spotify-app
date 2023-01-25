import { useAuth } from "@/contexts/auth/AuthProvider";
import { setAuthToken } from "@/redux/auth/actions";
import { selectAuthToken } from "@/redux/auth/selectors";
import { RootState, useAppDispatch, useAppSelector, wrapper } from "@/redux/store";
import { setTopLists } from "@/redux/top-lists/actions";
import { Album, PlayList } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TopLists() {
  const { get } = useAuth();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  const query = useRouter().query as { country?: string };
  let country = query.country;

  // Function to fetch a country's top list
  const getCountryTopLists = async (country: string) => {
    const topListQuery = encodeURIComponent(`spotify, top 50 ${country}`);

    // Fetching the top list for the country
    const response = await get<{
      playlists: { items: PlayList[] };
    }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${topListQuery}&type=playlist&limit=1`);
    
    // Getting the track api url
    const tracksURL = response.playlists.items[0].tracks.href;

    // Fetching top list tracks
    const trackData = await get<{
      items: { track: Album }[];
    }>(tracksURL);

    // Getting the track from item result
    const tracks = trackData.items.map(item => item.track);
    
    // Updating country top list in redux
    dispatch(setTopLists(country, tracks));
  }

  useEffect(() => {
    if(!country) country = 'Global';
    getCountryTopLists(country);
  }, [country]);

  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        toplists {token}
      </main>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  const encodedCredentials = Buffer.from(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');

  if(!(getState() as RootState).auth.generic.token) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_TOKEN_ENDPOINT}?grant_type=client_credentials`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const { access_token } = await data.json();
    dispatch(setAuthToken(access_token));
  }

  return {props: {}};
})