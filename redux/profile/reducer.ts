import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { ADD_PROFILE_RECOMMENDATIONS, SET_PROFILE_MODIFY_TOKEN, SET_PROFILE_RECOMMENDATIONS, SET_PROFILE_RECOMMENDATIONS_TIME_FRAME, SET_PROFILE_TOKENS, SET_PROFILE_TOP, SET_PROFILE_TOP_TIME_FRAME } from "./constants";
import { ProfileState, ProfileTopType } from "./types";

// Function to get property key based on top type
const getPropertyName = (type: ProfileTopType) => {
    if(type === 'artists') return 'topArtists';
    if(type === 'tracks') return 'topTracks';
    return 'topGenres';
}

// Creating reducer actions
type ReducerAction = (state: ProfileState, action: AnyAction) => ProfileState;

const setProfileToken: ReducerAction = (state, action) => {
    const { token, refreshToken } = action.payload;
    return updateObject(state, {
        ...state,
        token,
        refreshToken,
        loading: false
    })
}

const setProfileModifyTokens: ReducerAction = (state, action) => {
    const token = action.payload;
    return updateObject(state, {
        ...state,
        modifyToken: token
    })
}

const setProfileTop: ReducerAction = (state, action) => {
    const { type, items, timeFrame } = action.payload;

    const property = getPropertyName(type);
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

    const property = getPropertyName(type);
    return updateObject(state, {
        ...state,
        [property]: {
            ...state[property],
            timeFrame
        }
    })
}

const setProfileRecommendationsTimeFrame: ReducerAction = (state, action) => {
    const { type, timeFrame } = action.payload;

    const property = type === 'artist' ? 'artistTimeFrame' : 'trackTimeFrame';
    return updateObject(state, {
        ...state,
        recommendations: {
            ...state.recommendations,
            [property]: timeFrame
        }
    })
}

const setProfileRecommendations: ReducerAction = (state, action) => {
    const items = action.payload;

    return updateObject(state, {
        ...state,
        recommendations: {
            ...state.recommendations,
            items
        }
    })
}

const addProfileRecommendations: ReducerAction = (state, action) => {
    const items = action.payload;

    return updateObject(state, {
        ...state,
        recommendations: {
            ...state.recommendations,
            items: [...(state.recommendations.items || []), ...items]
        }
    })
}

// Creating reducer
export const profileReducer = createReducer({
    token: null,
    refreshToken: null,
    modifyToken: null,
    loading: true,
    topArtists: { timeFrame: 'long_term', items: {} },
    topTracks: { timeFrame: 'long_term', items: {} },
    topGenres: { timeFrame: 'long_term', items: {} },
    recommendations: { artistTimeFrame: 'long_term', trackTimeFrame: 'long_term', items: null }
}, {
    [SET_PROFILE_TOKENS]: setProfileToken,
    [SET_PROFILE_MODIFY_TOKEN]: setProfileModifyTokens,
    [SET_PROFILE_TOP]: setProfileTop,
    [SET_PROFILE_TOP_TIME_FRAME]: setProfileTopTimeFrame,
    [SET_PROFILE_RECOMMENDATIONS_TIME_FRAME]: setProfileRecommendationsTimeFrame,
    [SET_PROFILE_RECOMMENDATIONS]: setProfileRecommendations,
    [ADD_PROFILE_RECOMMENDATIONS]: addProfileRecommendations
})