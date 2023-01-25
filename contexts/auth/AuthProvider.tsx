import { selectAuthToken } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/store';
import React, { ReactElement } from 'react';

const AuthContext = React.createContext({} as {
    get: <T>(query: string) => Promise<T>;
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{
    children: ReactElement[];
}> = ({ children }) => {
    const token = useAppSelector(selectAuthToken);

    const get = async function<T>(query: string) {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
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