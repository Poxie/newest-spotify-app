declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_WEBSITE_NAME: string;
            NEXT_PUBLIC_CLIENT_ID: string;
            NEXT_PUBLIC_TOKEN_ENDPOINT: string;
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_AUTH_ENDPOINT: string;
            NEXT_PUBLIC_REDIRECT_URI: string;
            CLIENT_ID: string;
        }
    }
}

export {};