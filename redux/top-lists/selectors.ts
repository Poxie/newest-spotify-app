import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCountryTracks = (state: RootState, country: string) => state.topLists.countries[country];
export const selectTracksFetched = createSelector(
    [selectCountryTracks],
    tracks => tracks !== undefined
)