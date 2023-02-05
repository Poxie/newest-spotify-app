import { Album, Artist, Track } from "@/types"

export type ArtistInfo = {
    artist: Artist;
    relatedArtists: Artist[];
    tracks: Track[];
    albums: Album[];
}
export type ExploreState = {
    artist: Artist | null;
    song: Track | null;
    recommendations: Track[] | null;
    artistInfo: ArtistInfo | null;
}