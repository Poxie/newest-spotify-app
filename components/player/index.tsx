import { Track } from "@/types";
import Image from "next/image";
import styles from './Player.module.scss';
import { PlayerControls } from "./PlayerControls";

export const Player: React.FC<Partial<Track> & {
    className?: string;
    loading?: boolean;
}> = ({ loading, uri, preview_url, name, artists, album, className }) => {
    className = [
        styles['container'],
        className ? className : ''
    ].join(' ');
    
    // Showing loading placeholder
    if(loading || !album || !artists) {
        return(
            <div className={className}>
                <div className={styles['image']}/>
                <div className={styles['text']}>
                    <div className={styles['name-loading']} />
                    <div className={styles['artist-loading']} />
                </div>
                <PlayerControls previewURL="" />
            </div>
        )
    }

    const image = album.images[1];
    const artist = artists[0];
    return(
        <div className={className}>
            <a 
                className={styles['image']}
                href={uri}
            >
                <Image 
                    src={image?.url}
                    alt={``}
                    fill
                />
            </a>
            <div className={styles['text']}>
                <a 
                    title={name}
                    className={styles['name']} 
                    href={uri}
                >
                    {name}
                </a>
                <a 
                    title={artist.name}
                    className={styles['artist']}
                    href={artist.uri}
                >
                    {artist.name}
                </a>
            </div>
            <PlayerControls 
                previewURL={preview_url || ''}
            />
        </div>
    )
}