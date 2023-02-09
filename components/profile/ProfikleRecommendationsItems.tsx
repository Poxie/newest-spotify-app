import styles from '../../styles/Profile.module.scss';
import { selectRecommendations, selectRecommendationsArtistTimeFrame, selectRecommendationsTrackTimeFrame, selectTopArtists, selectTopTracks } from "@/redux/profile/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Player } from "../player";
import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Track } from '@/types';
import { setProfileRecommendations } from '@/redux/profile/actions';

const PLACEHOLDER_COUNT = 8;
export const ProfileRecommendationsItems = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const trackTimeFrame = useAppSelector(selectRecommendationsTrackTimeFrame);
    const artistTimeFrame = useAppSelector(selectRecommendationsArtistTimeFrame);
    const tracks = useAppSelector(state => selectTopTracks(state, trackTimeFrame));
    const artists = useAppSelector(state => selectTopArtists(state, artistTimeFrame));
    const recommendations = useAppSelector(selectRecommendations);
    const fetching = useRef(false);

    // Fetching recommendations
    useEffect(() => {
        if(!tracks || !artists || recommendations || fetching.current) return;
        fetching.current = true;

        const seedTracks = tracks[0].id;
        const seedArtists = artists[0].id;
        const seedGenres = artists.slice(0,3).map(artist => artist.genres[0]).join(',');

        get<{ tracks: Track[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}`)
            .then(({ tracks }) => {
                dispatch(setProfileRecommendations(tracks));
            })
    }, [tracks, artists, recommendations]);

    return(
        <div className={styles['recommendation-items']}>
            {recommendations?.map(track => (
                <Player 
                    {...track}
                    key={track.id}
                />
            ))}

            {Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                <Player loading key={key} />
            ))}
        </div>
    )
}