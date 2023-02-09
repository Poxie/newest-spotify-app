import { Artist, TopTimeFrame, Track } from "@/types";
import { SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})
export const setProfileTop = (type: 'artists' | 'tracks', items: Track[] | Artist[], timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP,
    payload: { type, items, timeFrame }
})
export const setProfileTopTimeFrame = (type: 'artists' | 'tracks', timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP_TIME_FRAME,
    payload: { type, timeFrame }
})