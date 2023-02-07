import { SET_PROFILE_TOKENS } from "./constants";

export const setProfileTokens = (token: string, refreshToken: string) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})