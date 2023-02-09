import { Artist, TopTimeFrame, Track } from "@/types";
import { SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";
import { ProfileTopType } from "./types";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})
export const setProfileTop = (type: ProfileTopType, items: Track[] | Artist[], timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP,
    payload: { type, items, timeFrame }
})
export const setProfileTopTimeFrame = (type: ProfileTopType, timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP_TIME_FRAME,
    payload: { type, timeFrame }
})