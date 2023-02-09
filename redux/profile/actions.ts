import { Artist, TopTimeFrame, Track } from "@/types";
import { SET_PROFILE_TOKENS, SET_PROFILE_TOP } from "./constants";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})
export const setProfileTop = (type: 'artists' | 'tracks', items: Track[] | Artist[], timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP,
    payload: { type, items, timeFrame }
})