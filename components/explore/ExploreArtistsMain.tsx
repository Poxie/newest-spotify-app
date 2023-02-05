import styles from '../../styles/Explore.module.scss';
import { selectArtistInfoArtist, selectArtistInfoTopTrack } from "@/redux/explore/selectors"
import { useAppSelector } from "@/redux/store"
import { ExploreArtistInfoCard } from "./ExploreArtistInfoCard";

export const ExploreArtistsMain = () => {
    const artist = useAppSelector(selectArtistInfoArtist);
    const topTrack = useAppSelector(selectArtistInfoTopTrack);

    return(
        <div className={styles['artists-main']}>
            <ExploreArtistInfoCard 
                artist={artist}
            />
            <ExploreArtistInfoCard 
                track={topTrack}
            />
        </div>
    )
}