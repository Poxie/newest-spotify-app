import styles from '../../styles/Explore.module.scss';
import { selectArtistInfoArtist, selectArtistInfoTopTrack } from "@/redux/explore/selectors"
import { useAppSelector } from "@/redux/store"
import { ArtistInfoCard } from './ArtistInfoCard';

export const ArtistsMain = () => {
    const artist = useAppSelector(selectArtistInfoArtist);
    const topTrack = useAppSelector(selectArtistInfoTopTrack);

    return(
        <div className={styles['artists-main']}>
            <ArtistInfoCard 
                artist={artist}
            />
            <ArtistInfoCard 
                track={topTrack}
            />
        </div>
    )
}