import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_PROFILE_TOKENS } from "./constants";
import { ProfileState } from "./types";

// Creating reducer actions
type ReducerAction = (state: ProfileState, action: AnyAction) => ProfileState;

const setProfileTokens: ReducerAction = (state, action) => {
    const { token, refreshToken } = action.payload;
    return updateObject(state, {
        ...state,
        token,
        refreshToken
    })
}

// Creating reducer
export const profileReducer = createReducer({
    token: null,
    refreshToken: null
}, {
    [SET_PROFILE_TOKENS]: setProfileTokens
})