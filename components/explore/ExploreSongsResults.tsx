import { useAuth } from "@/contexts/auth/AuthProvider";
import { setExploreRecommendations } from "@/redux/explore/actions";
import { selectExploreArtist, selectExploreRecommendations, selectExploreSong } from "@/redux/explore/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Track } from "@/types";
import { useEffect } from "react";

export const ExploreSongsResults = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const song = useAppSelector(selectExploreSong);
    const artist = useAppSelector(selectExploreArtist);
    const results = useAppSelector(selectExploreRecommendations);
    
    // Function to fetch recommendations
    const getSongRecommendations = async () => {
        if(!artist || !song) return [];
        
        // Creating multiple recommendation requests
        const requests = artist.genres.map(genre => (
            get<{
                tracks: Track[]
            }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recommendations?seed_artists=${artist.id}&seed_tracks=${song.id}&seed_genres=${genre}`)
        ))

        // Waiting for all requests to finish
        const responses = await Promise.all(requests);

        // Merging requests' responses
        const tracks = ([] as Track[]).concat.apply([], responses.map(res => res.tracks));

        return tracks;
    }

    // If song or artist change, add recommendations
    useEffect(() => {
        if(!song || !artist) return;

        getSongRecommendations()
            .then(tracks => {
                dispatch(setExploreRecommendations(tracks));
            })
    }, [song?.id, artist?.id]);

    return(
        <section>
            {results.map(result => result.name)}
        </section>
    )
}