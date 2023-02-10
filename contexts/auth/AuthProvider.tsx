import { selectAuthToken } from '@/redux/auth/selectors';
import { setProfileTokens } from '@/redux/profile/actions';
import { selectProfileToken } from '@/redux/profile/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { ReactElement, useEffect } from 'react';

const AuthContext = React.createContext({} as {
    get: <T>(query: string) => Promise<T>;
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{
    children: ReactElement | ReactElement[];
}> = ({ children }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);
    const profileToken = useAppSelector(selectProfileToken);

    // Fetching profile token on mount
    useEffect(() => {
        const profileToken = window.localStorage.token;
        const refreshToken = window.localStorage.refreshToken;
        
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
        })
    }, []);

    // Function to get information from Spotify
    const get = async function<T>(query: string) {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${profileToken || token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data: T = await response.json();
        return data;
    }

    const value = {
        get
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}