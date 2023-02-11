import styles from '../../styles/Explore.module.scss';
import { ArtistItems } from './ArtistItems';
import { ArtistsMain } from './ArtistsMain';
import { ArtistsRelated } from './ArtistsRelated';
import { ArtistsSelector } from './ArtistsSelector';

export default function Artists() {
    return(
        <>
            <span className={styles['header']}>
                Enter your favorite artist and we will provide general information about the artist, as well as other artists you may like.
            </span>
            <ArtistsSelector />
            <ArtistsMain />
            <ArtistsRelated />
            <ArtistItems />
        </>
    )
}