import { Artist, TopTimeFrame, Track } from "@/types";
import { SET_PROFILE_RECOMMENDATIONS, SET_PROFILE_RECOMMENDATIONS_TIME_FRAME, SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";
import { ProfileTopGenre, ProfileTopType } from "./types";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})
export const setProfileTop = (type: ProfileTopType, items: Track[] | Artist[] | ProfileTopGenre[], timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP,
    payload: { type, items, timeFrame }
})
export const setProfileTopTimeFrame = (type: ProfileTopType, timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_TOP_TIME_FRAME,
    payload: { type, timeFrame }
})
export const setProfileRecommendationsTimeFrame = (type: 'track' | 'artist', timeFrame: TopTimeFrame) => ({
    type: SET_PROFILE_RECOMMENDATIONS_TIME_FRAME,
    payload: { type, timeFrame }
})
export const setProfileRecommendations = (items: Track[]) => ({
    type: SET_PROFILE_RECOMMENDATIONS,
    payload: items
})