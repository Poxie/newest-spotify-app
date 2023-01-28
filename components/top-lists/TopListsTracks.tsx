import { useAppSelector } from '@/redux/store';
import { selectCountryTracks } from '@/redux/top-lists/selectors';
import { useRouter } from 'next/router';
import styles from '../../styles/TopLists.module.scss';
import { TopListsTrack } from './TopListsTrack';

export const TopListsTracks = () => {
    const query = useRouter().query as { country?: string };
    const country = query.country ? query.country : 'Global';
    const allTracks = useAppSelector(state => selectCountryTracks(state, country));
    
    const tracks = allTracks?.slice(4, allTracks.length);
    return(
        <section className={styles['tracks']}>
            <ul className={styles['track-list']}>
                {tracks?.map((track, index) => (
                    <TopListsTrack 
                        {...track}
                        index={index}
                        key={track.id}
                    />
                ))}
            </ul>
        </section>
    )
}