import styles from '../../styles/Explore.module.scss';
import { selectArtistInfoAlbums, selectArtistInfoTracks } from "@/redux/explore/selectors"
import { useAppSelector } from "@/redux/store"
import { ArtistItemList } from './ArtistItemList';

export const ArtistItems = () => {
    const tracks = useAppSelector(selectArtistInfoTracks);
    const albums = useAppSelector(selectArtistInfoAlbums);
    
    return(
        <div className={styles['artist-items']}>
            <ArtistItemList 
                header={'Top tracks'}
                items={tracks}
                numbered
            />
            <ArtistItemList 
                header={'Albums'}
                items={albums}
            />
        </div>
    )
}