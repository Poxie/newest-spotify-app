import { SET_AUTH_REFRESH_TOKEN, SET_AUTH_TOKEN } from "./constants";

export const setAuthToken = (token: string) => ({
    type: SET_AUTH_TOKEN,
    payload: token
})
export const setAuthRefreshToken = (token: string) => ({
    type: SET_AUTH_REFRESH_TOKEN,
    payload: token
})