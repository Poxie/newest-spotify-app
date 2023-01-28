import { RootState } from "../store";

export const selectExploreSong = (state: RootState) => state.explore.song;
export const selectExploreArtist = (state: RootState) => state.explore.artist;