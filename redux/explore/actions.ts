import { Artist, Track } from "@/types";
import { SET_EXPLORE_ARTIST, SET_EXPLORE_SONG } from "./constants";

export const setExploreSong = (song: Track) => ({
    type: SET_EXPLORE_SONG,
    payload: song
})
export const setExploreArtist = (artist: Artist) => ({
    type: SET_EXPLORE_ARTIST,
    payload: artist
})