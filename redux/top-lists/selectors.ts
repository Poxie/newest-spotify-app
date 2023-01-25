import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCountryTracks = (state: RootState, country: string) => state.topLists.countries[country];
export const hasCountryTracksLoaded = createSelector(
    [selectCountryTracks],
    tracks => tracks !== undefined
)