import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";
import { ProfileState } from "./types";

// Creating reducer actions
type ReducerAction = (state: ProfileState, action: AnyAction) => ProfileState;

const setProfileTokens: ReducerAction = (state, action) => {
    const { token, refreshToken } = action.payload;
    return updateObject(state, {
        ...state,
        token,
        refreshToken,
        loading: false
    })
}

const setProfileTop: ReducerAction = (state, action) => {
    const { type, items, timeFrame } = action.payload;

    const property = type === 'artists' ? 'topArtists' : 'topTracks';
    return updateObject(state, {
        ...state,
        [property]: {
            ...state[property],
            items: {
                ...state[property].items,
                [timeFrame]: items
            }
        }
    })
}

const setProfileTopTimeFrame: ReducerAction = (state, action) => {
    const { type, timeFrame } = action.payload;

    const property = type === 'artists' ? 'topArtists' : 'topTracks';
    return updateObject(state, {
        ...state,
        [property]: {
            ...state[property],
            timeFrame
        }
    })
}

// Creating reducer
export const profileReducer = createReducer({
    token: null,
    refreshToken: null,
    loading: true,
    topArtists: { timeFrame: 'long_term', items: {} },
    topTracks: { timeFrame: 'long_term', items: {} }
}, {
    [SET_PROFILE_TOKENS]: setProfileTokens,
    [SET_PROFILE_TOP]: setProfileTop,
    [SET_PROFILE_TOP_TIME_FRAME]: setProfileTopTimeFrame
})