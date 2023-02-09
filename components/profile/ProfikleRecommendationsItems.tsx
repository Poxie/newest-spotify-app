import styles from '../../styles/Profile.module.scss';
import { selectRecommendations, selectRecommendationsArtistTimeFrame, selectRecommendationsTrackTimeFrame, selectTopArtists, selectTopTracks } from "@/redux/profile/selectors"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Player } from "../player";
import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Artist, Track } from '@/types';
import { addProfileRecommendations, setProfileRecommendations, setProfileTop } from '@/redux/profile/actions';

const PLACEHOLDER_COUNT = 8;
const SCROLL_THRESHOLD = 900;
export const ProfileRecommendationsItems = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const trackTimeFrame = useAppSelector(selectRecommendationsTrackTimeFrame);
    const artistTimeFrame = useAppSelector(selectRecommendationsArtistTimeFrame);
    const tracks = useAppSelector(state => selectTopTracks(state, trackTimeFrame));
    const artists = useAppSelector(state => selectTopArtists(state, artistTimeFrame));
    const recommendations = useAppSelector(selectRecommendations);
    const fetching = useRef(false);

    // Function to get recommendations
    const getRecommendations = async (tracks: Track[], artists: Artist[]) => {
        if(!tracks || !artists) throw new Error('TrackArtist error');
        fetching.current = true;

        const seedTracks = tracks[0].id;
        const seedArtists = artists[0].id;
        const seedGenres = artists.slice(0,3).map(artist => artist.genres[0]).join(',');

        const { tracks: results } = await get<{ tracks: Track[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}`);
        fetching.current = false;
        return results;
    }

    // Fetching recommendations on mount
    useEffect(() => {
        if(!tracks || !artists || recommendations || fetching.current) return;

        getRecommendations(tracks, artists)
            .then(tracks => {
                dispatch(setProfileRecommendations(tracks));
            })
    }, [tracks, artists, recommendations]);

    // Fetching recommendations on time frame change
    useEffect(() => {
        // Preventing fetch request on these time frames; other component fetches these
        if((!artists && artistTimeFrame === 'long_term') || (!tracks && trackTimeFrame === 'long_term')) return;

        // If requested time frame is not yet fetched
        if(!artists || !tracks) {
            const type = !artists ? 'artists' : 'tracks';
            const timeFrame = !artists ? artistTimeFrame : trackTimeFrame;
            get<{ items: Track[] | Artist[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/top/${type}?time_range=${timeFrame}`)
                .then(({ items }) => {
                    dispatch(setProfileTop(type, items, timeFrame));

                    // Fetching new recommendations
                    getRecommendations(!tracks ? items as Track[] : tracks, !artists ? items as Artist[] : artists)
                        .then(newRecommendations => {
                            dispatch(setProfileRecommendations(newRecommendations));
                        })
                })
        } else {
            getRecommendations(tracks, artists)
                .then(tracks => {
                    dispatch(setProfileRecommendations(tracks));
                })
        }
    }, [trackTimeFrame, artistTimeFrame]);

    // Fetching recommendations on scroll
    useEffect(() => {
        const onScroll = async () => {
            if(fetching.current || !tracks || !artists || !recommendations) return;

            // Checking if scroll is near bottom of page
            const diffFromBottom = Math.abs(window.scrollY + window.innerHeight - document.body.offsetHeight);
            if(diffFromBottom < SCROLL_THRESHOLD) {
                // If so, fetch more recommendations
                const items = await getRecommendations(tracks, artists);
                
                // Removing duplicates
                const prevIds = recommendations.map(track => track.id);
                const newItems = items.filter(item => !prevIds.includes(item.id));
                console.log(tracks, newItems);

                dispatch(addProfileRecommendations(newItems));
            }
        }

        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
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