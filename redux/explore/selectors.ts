import { RootState } from "../store";

export const selectExploreSong = (state: RootState) => state.explore.song;
export const selectExploreArtist = (state: RootState) => state.explore.artist;
export const selectExploreRecommendations = (state: RootState) => state.explore.recommendations;
export const selectArtistInfoArtist = (state: RootState) => state.explore.artistInfo?.artist;
export const selectArtistInfoTracks = (state: RootState) => state.explore.artistInfo?.tracks;
export const selectArtistInfoTopTrack = (state: RootState) => state.explore.artistInfo?.tracks[0];
export const selectArtistInfoAlbums = (state: RootState) => state.explore.artistInfo?.albums;
export const selectArtistInfoRelatedArtists = (state: RootState) => state.explore.artistInfo?.relatedArtists;