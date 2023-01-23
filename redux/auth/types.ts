export type AuthState = {
    generic: {
        token: string | null;
        refreshToken: string | null;
    }
}