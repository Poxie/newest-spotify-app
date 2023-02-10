import { Artist, TopTimeFrame, Track } from "@/types";
import { ADD_PROFILE_RECOMMENDATIONS, SET_PROFILE_MODIFY_TOKEN, SET_PROFILE_RECOMMENDATIONS, SET_PROFILE_RECOMMENDATIONS_TIME_FRAME, SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";
import { ProfileTopGenre, ProfileTopType } from "./types";

export const setProfileTokens = (token: string | null, refreshToken: string | null) => ({
    type: SET_PROFILE_TOKENS,
    payload: { token, refreshToken }
})
export const setProfileModifyToken = (token: string) => ({
    type: SET_PROFILE_MODIFY_TOKEN,
    payload: token
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
export const addProfileRecommendations = (items: Track[]) => ({
    type: ADD_PROFILE_RECOMMENDATIONS,
    payload: items
})