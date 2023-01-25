import { setAuthToken } from "@/redux/auth/actions";
import { selectAuthToken } from "@/redux/auth/selectors";
import { RootState, useAppSelector, wrapper } from "@/redux/store";
import Head from "next/head";

export default function TopLists() {
  const token = useAppSelector(selectAuthToken);
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