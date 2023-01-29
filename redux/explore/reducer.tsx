import { Track } from "@/types";
import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { ADD_EXPLORE_RECOMMENDATIONS, SET_EXPLORE_ARTIST, SET_EXPLORE_RECOMMENDATIONS, SET_EXPLORE_SONG } from "./constants";
import { ExploreState } from "./types";

// Creating reducer actions
type ReducerAction = (state: ExploreState, action: AnyAction) => ExploreState;

const setExploreSong: ReducerAction = (state, action) => {
    return updateObject(state, {
        ...state,
        song: action.payload
    })
}

const setExploreArtist: ReducerAction = (state, action) => {
    return updateObject(state, {
        ...state,
        artist: action.payload
    })
}

const setExploreRecommendations: ReducerAction = (state, action) => {
    const prevIds: string[] = [];
    return updateObject(state, {
        ...state,
        recommendations: action.payload.filter((track: Track) => {
            if(prevIds.includes(track.id)) return false;
            prevIds.push(track.id);
            return true;
        })
    })
}

const addExploreRecommendations: ReducerAction = (state, action) => {
    const prevIds: string[] = [];
    return updateObject(state, {
        ...state,
        recommendations: [...(state.recommendations || []), ...action.payload].filter((track: Track) => {
            if(prevIds.includes(track.id)) return false;
            prevIds.push(track.id);
            return true;
        })
    })
}

// Creating reducer
export const exploreReducer = createReducer({
    artist: null,
    song: null,
    recommendations: null
}, {
    [SET_EXPLORE_SONG]: setExploreSong,
    [SET_EXPLORE_ARTIST]: setExploreArtist,
    [SET_EXPLORE_RECOMMENDATIONS]: setExploreRecommendations,
    [ADD_EXPLORE_RECOMMENDATIONS]: addExploreRecommendations
})