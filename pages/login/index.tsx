import { setProfileTokens } from "@/redux/profile/actions";
import { useAppDispatch } from "@/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

type TokenResponse = {
    access_token: string;
    refresh_token: string;
}

const SCOPES = 'user-read-private playlist-read-private user-top-read user-read-recently-played';
const CODE_URL = `
${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}
?response_type=code
&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}
&scope=${encodeURIComponent(SCOPES)}
&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI)}
`;
export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const getTokenFromCode = useCallback(async (code: string) => {
        const response = await fetch(`/api/token`, {
            method: 'POST',
            body: JSON.stringify({ code })
        });
        const data: TokenResponse = await response.json();
        return data;
    }, []);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        // If code is present, log user in
        if(code) {
            getTokenFromCode(code)
                .then(({ access_token, refresh_token }) => {
                    // Storing tokens in local storage
                    window.localStorage.token = access_token;
                    window.localStorage.refreshToken = refresh_token;

                    // Store tokens
                    dispatch(setProfileTokens(access_token, refresh_token));

                    // Go to profile after login
                    router.replace('/profile');
                })
                .catch(error => {
                    // Requesting new code on error
                    window.location.replace(CODE_URL);
                })
        } 
        // If code is not present, redirect to spotify login page
        else {
            window.location.replace(CODE_URL)
        }
    }, []);

    return(
        <>
        <Head>
            <title>Login with Spotify</title>
            <meta name="description" content="Login to view your top songs, artists and genres." />
        </Head>
        <main style={{
            height: `calc(100vh - var(--footer-height))`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1 style={{ margin: 0 }}>
                Logging you in...
            </h1>
        </main>
        </>
    )
}