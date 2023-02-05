import styles from '../../styles/Explore.module.scss';
import { selectArtistInfoAlbums, selectArtistInfoTracks } from "@/redux/explore/selectors"
import { useAppSelector } from "@/redux/store"
import { ExploreArtistItemList } from "./ExploreArtistItemList";

export const ExploreArtistItems = () => {
    const tracks = useAppSelector(selectArtistInfoTracks);
    const albums = useAppSelector(selectArtistInfoAlbums);
    
    return(
        <div className={styles['artist-items']}>
            <ExploreArtistItemList 
                header={'Top tracks'}
                items={tracks}
                numbered
            />
            <ExploreArtistItemList 
                header={'Albums'}
                items={albums}
            />
        </div>
    )
}