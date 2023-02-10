import { TopTimeFrame } from "@/types";
import { RootState } from "../store";

export const selectProfileToken = (state: RootState) => state.profile.token;
export const selectProfileTokenLoading = (state: RootState) => state.profile.loading;
export const selectProfileModifyToken = (state: RootState) => state.profile.modifyToken;

export const selectTopArtists = (state: RootState, timeFrame: TopTimeFrame) => state.profile.topArtists.items[timeFrame];
export const selectTopArtistsTimeFrame = (state: RootState) => state.profile.topArtists.timeFrame;
export const selectTopTracks = (state: RootState, timeFrame: TopTimeFrame) => state.profile.topTracks.items[timeFrame];
export const selectTopTracksTimeFrame = (state: RootState) => state.profile.topTracks.timeFrame;
export const selectTopGenres = (state: RootState, timeFrame: TopTimeFrame) => state.profile.topGenres.items[timeFrame];
export const selectTopGenresTimeFrame = (state: RootState) => state.profile.topGenres.timeFrame;

export const selectRecommendationsArtistTimeFrame = (state: RootState) => state.profile.recommendations.artistTimeFrame;
export const selectRecommendationsTrackTimeFrame = (state: RootState) => state.profile.recommendations.trackTimeFrame;
export const selectRecommendations = (state: RootState) => state.profile.recommendations.items;