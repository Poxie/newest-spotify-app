import { TopTimeFrame } from "@/types";
import { RootState } from "../store";

export const selectProfileToken = (state: RootState) => state.profile.token;
export const selectProfileTokenLoading = (state: RootState) => state.profile.loading;

export const selectTopArtists = (state: RootState, timeFrame: TopTimeFrame) => state.profile.topArtists.items[timeFrame];
export const selectTopArtistsTimeFrame = (state: RootState) => state.profile.topArtists.timeFrame;
export const selectTopTracks = (state: RootState, timeFrame: TopTimeFrame) => state.profile.topTracks.items[timeFrame];
export const selectTopTracksTimeFrame = (state: RootState) => state.profile.topTracks.timeFrame;