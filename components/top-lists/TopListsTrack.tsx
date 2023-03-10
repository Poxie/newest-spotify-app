import styles from '../../styles/TopLists.module.scss';
import { Track } from "@/types";
import Image from 'next/image';

const MAIN_DELAY = .05;
export const TopListsTrack: React.FC<{
    track: Track | undefined;
    index: number;
    animateIndex: number;
}> = ({ track, index, animateIndex }) => {
    // Show loading placeholder
    if(!track) {
        return(
            <li
                className={styles['track']} 
                aria-hidden="true"
            >
                <div className={styles['track-main']}>
                    <div className={styles['track-image']} />
                    <div className={styles['track-text-loading']} />
                </div>
                <div className={styles['track-text-loading']} />
            </li>
        )
    };
    
    // Destructuring track properties
    const { artists, name, uri, album } = track;
    
    // Getting the album cover
    const images = album.images;
    const image = images[2].url;
    return(
        <li 
            className={styles['track']}
            style={{
                animationDelay: `${MAIN_DELAY * animateIndex}s`
            }}
        >
            <div className={styles['track-main']}>
                <span className={styles['track-index']}>
                    {index}
                </span>
                <a 
                    className={styles['track-image']}
                    href={uri}
                    aria-label="Go to song"
                >
                    <Image 
                        src={image}
                        width={28}
                        height={28}
                        alt=''
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