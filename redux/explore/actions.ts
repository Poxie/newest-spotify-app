import { Artist, Track } from "@/types";
import { ADD_EXPLORE_RECOMMENDATIONS, SET_ARTIST_INFO, SET_EXPLORE_ARTIST, SET_EXPLORE_RECOMMENDATIONS, SET_EXPLORE_SONG } from "./constants";
import { ArtistInfo } from "./types";

export const setExploreSong = (song: Track) => ({
    type: SET_EXPLORE_SONG,
    payload: song
})
export const setExploreArtist = (artist: Artist) => ({
    type: SET_EXPLORE_ARTIST,
    payload: artist
})
export const setExploreRecommendations = (tracks: Track[]) => ({
    type: SET_EXPLORE_RECOMMENDATIONS,
    payload: tracks
})
export const addExploreRecommendations = (tracks: Track[]) => ({
    type: ADD_EXPLORE_RECOMMENDATIONS,
    payload: tracks
})
export const setArtistInfo = (artistInfo: ArtistInfo) => ({
    type: SET_ARTIST_INFO,
    payload: artistInfo
})