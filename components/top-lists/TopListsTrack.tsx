import styles from '../../styles/TopLists.module.scss';
import { Track } from "@/types";
import Image from 'next/image';

const START_INDEX = 5;
export const TopListsTrack: React.FC<Track & {
    index: number;
    loading?: boolean;
}> = ({ artists, name, uri, album, index, loading }) => {
    if(loading) return null;
    
    const images = album.images;
    const image = images[2].url;
    return(
        <li className={styles['track']}>
            <div className={styles['track-main']}>
                <span className={styles['track-index']}>
                    {index + START_INDEX}
                </span>
                <a 
                    className={styles['track-image']}
                    href={uri}
                >
                    <Image 
                        src={image}
                        alt=''
                        fill
                    />
                </a>
                <a href={uri}>
                    {name}
                </a>
            </div>
            <div className={styles['track-author']}>
                by 
                {' '}
                {artists
                    .map(artist => (
                        <a 
                            href={artist.uri}
                            key={artist.id}
                        >
                            {artist.name}
                        </a>
                    ))
                    .reduce((prev, current) => [prev, ', ', current] as any)
                }
            </div>
        </li>
    )
}