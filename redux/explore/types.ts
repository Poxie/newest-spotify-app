import { Artist, Track } from "@/types"

export type ExploreState = {
    artist: Artist | null;
    song: Track | null;
    recommendations: Track[];
}