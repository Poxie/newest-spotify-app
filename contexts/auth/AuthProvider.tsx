import { selectAuthToken } from '@/redux/auth/selectors';
import { setProfileModifyToken, setProfileTokens } from '@/redux/profile/actions';
import { selectProfileModifyToken, selectProfileToken } from '@/redux/profile/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { ReactElement, useCallback, useEffect } from 'react';

const AuthContext = React.createContext({} as {
    get: <T>(query: string, modify?: boolean) => Promise<T>;
    post: <T>(query: string, body: Object) => Promise<T>;
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{
    children: ReactElement | ReactElement[];
}> = ({ children }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);
    const profileToken = useAppSelector(selectProfileToken);
    const modifyToken = useAppSelector(selectProfileModifyToken);

    // Function to refresh token
    const refreshAccessToken = useCallback(async (refreshToken: string) => {
        const response = await fetch('/api/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        });
        const data: { access_token: string } = await response.json();
        return data;
    }, []);

    // Fetching profile token on mount
    useEffect(() => {
        const profileToken = window.localStorage.token;
        const refreshToken = window.localStorage.refreshToken;
        const modifyRefreshToken =window.localStorage.modifyRefreshToken;
        
        // If user is not logged in, don't fetch data
        if(!profileToken || !refreshToken) {
            dispatch(setProfileTokens(null, null));
            return;
        }

        // Else fetch for refreshed token
        refreshAccessToken(refreshToken)
            .then(({ access_token }) => {
                dispatch(setProfileTokens(access_token, refreshToken));
            })

        // Fetching for refreshed modify token
        if(modifyRefreshToken) {
            refreshAccessToken(modifyRefreshToken)
                .then(({ access_token }) => {
                    dispatch(setProfileModifyToken(access_token));
                })
        }
    }, []);

    // Setting profile tokens on localstorage change
    useEffect(() => {
        const onChange = (e: StorageEvent) => {
            if(!e.newValue || e.key !== 'modifyToken') return;
            dispatch(setProfileModifyToken(e.newValue));
        }

        window.addEventListener('storage', onChange);
        return () => window.removeEventListener('storage', onChange);
    }, []);

    // Function to get information from Spotify
    const get = async function<T>(query: string, modify?: boolean, token?: string) {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || (modify ? modifyToken : profileToken) || token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // If access token expired
        if(response.status === 401) {
            const refreshToken = window.localStorage.refreshToken;
            const { access_token } = await refreshAccessToken(refreshToken);

            // Updating store with new access token
            dispatch(setProfileTokens(access_token, refreshToken));

            // Fetching the data again, with new access token
            const refreshedData: T = await get(query, modify, access_token);
            return refreshedData;
        }

        // Else return data
        const data: T = await response.json();
        return data;
    }

    // Function to post information to Spotify
    const post = async function<T>(query: string, body: Object, token?: string) {
        const response = await fetch(query, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token || modifyToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(body)
        });

        // If access token expired
        if(response.status === 401) {
            const { access_token } = await  refreshAccessToken(window.localStorage.modifyRefreshToken);

            // Updating store with new modify access token
            dispatch(setProfileModifyToken(access_token));

            // Fetching the data again, with new access token
            const refreshedData: T = await post(query, body, access_token);
            return refreshedData;
        }

        // Else return data
        const data: T = await response.json();
        return data;
    }

    const value = {
        get,
        post
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}