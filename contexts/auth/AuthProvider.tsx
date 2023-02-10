import { selectAuthToken } from '@/redux/auth/selectors';
import { setProfileModifyToken, setProfileTokens } from '@/redux/profile/actions';
import { selectProfileModifyToken, selectProfileToken } from '@/redux/profile/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { ReactElement, useEffect } from 'react';

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
        fetch(`/api/refresh`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken })
        }).then(res => res.json()).then(data => {
            if(data.error) return;
            dispatch(setProfileTokens(data.access_token, refreshToken));
        });

        // Fetching for refreshed modify token
        if(modifyRefreshToken) {
            fetch('/api/refresh', {
                method: 'POST',
                body: JSON.stringify({ refreshToken: modifyRefreshToken })
            }).then(res => res.json()).then(data => {
                if(data.error) return;
                dispatch(setProfileModifyToken(data.access_token));
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
    const get = async function<T>(query: string, modify?: boolean) {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${(modify ? modifyToken : profileToken) || token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data: T = await response.json();
        return data;
    }

    // Function to post information to Spotify
    const post = async function<T>(query: string, body: Object) {
        const response = await fetch(query, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${modifyToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(body)
        });
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