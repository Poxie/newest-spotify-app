import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_AUTH_REFRESH_TOKEN, SET_AUTH_TOKEN } from "./constants";
import { AuthState } from "./types";

// Creating reducer actions
type ReducerAction = (state: AuthState, action: AnyAction) => AuthState;

const setAuthToken: ReducerAction = (state, action) => {
    return updateObject(state, {
        generic: {
            ...state.generic,
            token: action.payload
        }
    })
}
const setAuthRefreshToken: ReducerAction = (state, action) => {
    return updateObject(state, {
        generic: {
            ...state.generic,
            refreshToken: action.payload
        }
    })
}

// Creating reducer
export const authReducer = createReducer({
    generic: {
        token: null,
        refreshToken: null
    }
}, {
    [SET_AUTH_TOKEN]: setAuthToken,
    [SET_AUTH_REFRESH_TOKEN]: setAuthRefreshToken
})