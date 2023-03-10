import styles from '../../styles/Explore.module.scss';
import { selectArtistInfoRelatedArtists } from "@/redux/explore/selectors"
import { useAppSelector } from "@/redux/store"
import { ArtistInfoCard } from './ArtistInfoCard';

const PLACEHOLDER_AMOUNT = 4;
export const ArtistsRelated = () => {
    let artists = useAppSelector(selectArtistInfoRelatedArtists);

    if(!artists) {
        artists = Array.from(Array(PLACEHOLDER_AMOUNT))
    }

    return(
        <>
            <span className={styles['related-artists-header']}>
                Related artists
            </span>

            <div className={styles['related-artists']}>
                {artists?.slice(0,4)?.map((artist, key) => (
                    <ArtistInfoCard 
                        artist={artist}
                        small={true}
                        key={artist?.id || key}
                    />
                ))}
            </div>
        </>
    )
}