import { SET_PROFILE_TOKENS } from "./constants";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})