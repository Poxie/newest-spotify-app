import { setProfileModifyToken, setProfileTokens } from "@/redux/profile/actions";
import { useAppDispatch } from "@/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

type TokenResponse = {
    access_token?: string;
    refresh_token?: string;
}

const SCOPES = 'user-read-private user-top-read user-read-recently-played';
const MODIFY_SCOPES = 'playlist-modify-public playlist-modify-private playlist-read-private'

const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const MODIFY_REDIRECT_URI = REDIRECT_URI + '?type=modify';

const getCodeURL = (type: string='default') => {
    return`
${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}
?response_type=code
&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}
&scope=${encodeURIComponent(type === 'default' ? SCOPES : MODIFY_SCOPES)}
&redirect_uri=${encodeURIComponent(type === 'default' ? REDIRECT_URI : MODIFY_REDIRECT_URI)}
`
}

export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { type } = router.query as { type?: string };

    const getTokenFromCode = useCallback(async (code: string, redirect_uri: string) => {
        const response = await fetch(`/api/token`, {
            method: 'POST',
            body: JSON.stringify({ code, redirect_uri })
        });
        const data: TokenResponse = await response.json();
        return data;
    }, []);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        // If code is present, log user in
        if(code) {
            getTokenFromCode(code, type !== 'modify' ? REDIRECT_URI : MODIFY_REDIRECT_URI)
                .then(({ access_token, refresh_token }) => {
                    // If not tokems
                    if(!access_token || !refresh_token) return;

                    if(type !== 'modify') {
                        // Storing tokens in local storage
                        window.localStorage.token = access_token;
                        window.localStorage.refreshToken = refresh_token;

                        // Store tokens
                        dispatch(setProfileTokens(access_token, refresh_token));

                        // Go to profile
                        router.replace('/profile');
                    } else {
                        // Storing tokens in local storage
                        window.localStorage.modifyToken = access_token;
                        window.localStorage.modifyRefreshToken = refresh_token;

                        // Store tokens
                        dispatch(setProfileModifyToken(access_token));
                        
                        // Close page
                        window.close();
                    }
                })
                .catch(error => {
                    // Requesting new code on error
                    window.location.replace(getCodeURL(type));
                })
        } 
        // If code is not present, redirect to spotify login page
        else {
            window.location.replace(getCodeURL(type))
        }
    }, [type]);

    return(
        <>
        <Head>
            <title>{`Login with Spotify - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}</title>
            <meta name="og:title" content={`Login with Spotify - ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
            <meta name="description" content="Login to view your top songs, artists and genres." />
            <meta name="og:description" content="Login to view your top songs, artists and genres." />
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