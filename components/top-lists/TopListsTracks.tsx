import { useAppSelector } from '@/redux/store';
import { selectCountryTracks } from '@/redux/top-lists/selectors';
import { Track } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/TopLists.module.scss';
import Button from '../button';
import { TopListsTrack } from './TopListsTrack';

const SHOW_COUNT = 10;
const START_INDEX = 5;
const PLACEHOLDER_COUNT = 12;
export const TopListsTracks = () => {
    // Getting all tracks
    const query = useRouter().query as { country?: string };
    const country = query.country ? query.country : 'Global';
    const allTracks = useAppSelector(state => selectCountryTracks(state, country));

    // Defining how many tracks to show
    const [visibleTracks, setVisibleTracks] = useState(SHOW_COUNT + START_INDEX);

    // Resetting visible tracks count on country change
    useEffect(() => {
        setVisibleTracks(SHOW_COUNT + START_INDEX);
    }, [country]);

    // Method to update visible track count
    const showMore = () => setVisibleTracks(prev => prev + SHOW_COUNT);
    
    const tracks: Track[] | undefined[] = allTracks?.slice(START_INDEX - 1, visibleTracks) || Array.from(Array(PLACEHOLDER_COUNT));
    return(
        <section className={styles['tracks']}>
            <ul className={styles['track-list']}>
                {tracks.map((track, index) => (
                    <TopListsTrack 
                        track={track}
                        index={index + START_INDEX}
                        animateIndex={index + START_INDEX !== visibleTracks ? index % SHOW_COUNT : 10}
                        key={track?.id || index}
                    />
                ))}
            </ul>
            {visibleTracks < (allTracks?.length || -Infinity) && (
                <Button
                    onClick={showMore}
                    className={styles['track-button']}
                    type={'transparent'}
                >
                    Show more
                </Button>
            )}
        </section>
    )
}