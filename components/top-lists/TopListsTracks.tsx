import { useAppSelector } from '@/redux/store';
import { selectCountryTracks } from '@/redux/top-lists/selectors';
import { Track } from '@/types';
import { useRouter } from 'next/router';
import styles from '../../styles/TopLists.module.scss';
import { TopListsTrack } from './TopListsTrack';

const PLACEHOLDER_COUNT = 12;
export const TopListsTracks = () => {
    const query = useRouter().query as { country?: string };
    const country = query.country ? query.country : 'Global';
    const allTracks = useAppSelector(state => selectCountryTracks(state, country));
    
    const tracks: Track[] | undefined[] = allTracks?.slice(4, allTracks.length) || Array.from(Array(PLACEHOLDER_COUNT));
    return(
        <section className={styles['tracks']}>
            <ul className={styles['track-list']}>
                {tracks.map((track, index) => (
                    <TopListsTrack 
                        track={track}
                        index={index}
                        key={track?.id || index}
                    />
                ))}
            </ul>
        </section>
    )
}