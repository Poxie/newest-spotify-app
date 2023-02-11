import { memo } from 'react';
import styles from './Player.module.scss';

export const PlayerText: React.FC<{
    name: string;
    artist: string;
    uri: string;
}> = memo(({ name, artist, uri }) => {
    return(
        <div className={styles['text']}>
            <a 
                title={name}
                className={styles['name']} 
                href={uri}
            >
                {name}
            </a>
            <a 
                title={artist}
                className={styles['artist']}
                href={uri}
            >
                {artist}
            </a>
        </div>
    )
});
PlayerText.displayName = 'PlayerText';