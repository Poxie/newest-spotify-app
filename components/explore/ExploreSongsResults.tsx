import styles from '../../styles/Explore.module.scss';
import { useAuth } from "@/contexts/auth/AuthProvider";
import { addExploreRecommendations, setExploreRecommendations } from "@/redux/explore/actions";
import { selectExploreArtist, selectExploreRecommendations, selectExploreSong } from "@/redux/explore/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Track } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Player } from "../player";

const PLACEHOLDER_COUNT = 12;
export const ExploreSongsResults = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const song = useAppSelector(selectExploreSong);
    const artist = useAppSelector(selectExploreArtist);
    const results = useAppSelector(selectExploreRecommendations);
    const [loading, setLoading] = useState(false);
    const list = useRef<HTMLDivElement>(null);
    const fetching = useRef(false);
    
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

        setLoading(true);
        dispatch(setExploreRecommendations([]));
        getSongRecommendations()
            .then(tracks => {
                dispatch(setExploreRecommendations(tracks));
                setLoading(false);
            })
    }, [song?.id, artist?.id]);

    // Showing more recommendations on scroll
    useEffect(() => {
        const onScroll = async () => {
            if(!list.current) return;

            const fromBottom = list.current.getBoundingClientRect().bottom;
            if(fromBottom - screen.height < screen.height && !fetching.current) {
                fetching.current = true;
                setLoading(true);

                const tracks = await getSongRecommendations();
                dispatch(addExploreRecommendations(tracks));
                
                fetching.current = false;
                setLoading(false);
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [song?.id, artist?.id]);

    if(!results) return null;
    return(
        <section>
            <h2 className={styles['recommendations-header']}>
                Songs based on <a href={song?.uri}>{song?.name}</a> and <a href={artist?.uri}>{artist?.name}</a>
            </h2>

            <div 
                className={styles['recommendations']}
                ref={list}
            >
                {results.map(result => (
                    <Player 
                        {...result}
                        key={result.id}
                    />
                ))}

                {loading && (
                    Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                        <Player loading key={key} />
                    ))
                )}
            </div>
        </section>
    )
}