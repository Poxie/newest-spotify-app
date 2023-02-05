import styles from '../../styles/Explore.module.scss';
import { Artist, Track } from "@/types"
import Image from "next/image";

export const ExploreArtistInfoCard: React.FC<{
    track?: Track;
    artist?: Artist;
    small?: boolean;
}> = ({ track, artist, small }) => {
    if(track && artist) throw new Error('Track and artist may not both be present.');

    // Creating className based on small property
    const className = [
        styles['info-card'],
        small ? styles['small'] : ''
    ].join(' ');

    // Show loading placeholder
    if(!track && !artist) {
        return(
            <div className={className} aria-hidden="true">
                <div className={styles['info-card-image']} />
                <div className={styles['info-card-text']}>
                    <div className={styles['info-card-header-loading']} />
                    <div className={styles['info-card-sub-header-loading']} />
                    <div className={styles['info-card-sub-header-loading']} />
                </div>
            </div>
        )
    }

    // Extract info from tracks and artists
    const url = track ? track.uri : artist?.uri;
    const image = track?.album.images[1].url || artist?.images[1].url;
    const header = track?.name || artist?.name;
    const subHeader = track ? `${track.popularity} popularity` : `${artist?.followers.total.toLocaleString()} followers`;
    const genres = track ? track.artists[0]?.genres?.slice(0,3)?.join(', ') : artist?.genres?.slice(0,3)?.join(', ');
    return(
        <div className={className}>
            <a 
                className={styles['info-card-image']}
                href={url}
            >
                {image && (
                    <Image 
                        src={image}
                        fill
                        alt=""
                    />
                )}
            </a>
            <div className={styles['info-card-text']}>
                <a 
                    className={styles['info-card-header']}
                    href={url}
                >
                    {header}
                </a>
                <span className={styles['info-card-sub-header']}>
                    {subHeader}
                </span>
                <span className={styles['info-card-sub-header']}>
                    {genres}
                </span>
            </div>
        </div>
    )
}