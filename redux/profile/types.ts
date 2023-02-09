import { Artist, TopTimeFrame, Track } from "@/types";

export type ProfileState = {
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
    topTracks: {
        timeFrame: TopTimeFrame;
        items: {
            long_term?: Track[];
            medium_term?: Track[];
            short_term?: Track[];
        }
    };
    topArtists: {
        timeFrame: TopTimeFrame;
        items: {
            long_term?: Artist[];
            medium_term?: Artist[];
            short_term?: Artist[];
        }
    }
}