import { AnyAction } from "redux";
import { createReducer, updateObject } from "../utils";
import { SET_TOP_LISTS } from "./constants";
import { TopListsState } from "./types";

// Creating reducer actions
type ReducerAction = (state: TopListsState, action: AnyAction) => TopListsState;

const setTopLists: ReducerAction = (state, action) => {
    return updateObject(state, {
        ...state,
        countries: {
            ...state.countries,
            [action.payload.country]: action.payload.items
        }
    })
}

// Creating reducer
export const topListsReducer = createReducer({
    countries: {}
}, {
    [SET_TOP_LISTS]: setTopLists
})