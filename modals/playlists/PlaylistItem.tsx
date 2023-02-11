import styles from './Playlists.module.scss';
import { PlayList } from "@/types";
import Image from 'next/image';

export const PlaylistItem: React.FC<{
    playlist?: PlayList;
    active?: boolean;
    onClick?: (id: string) => void;
}> = ({ playlist, active, onClick }) => {
    // If no playlist is given, show placeholder skeleton
    if(!playlist) {
        return(
            <div className={styles['item']}>
                <div className={styles['item-image']} />
                <div className={styles['item-text-loading']} />
            </div>
        )
    }

    const { id, name, images } = playlist;
    const image = images[0]?.url;

    const className = [
        styles['item'],
        active ? styles['active'] : ''
    ].join(' ');
    return(
        <button 
            className={className} 
            title={name} 
            aria-label={name}
            onClick={() => {
                if(onClick) onClick(id);
            }}
        >
            <div className={styles['item-image']}>
                {image && (
                    <Image 
                        src={image}
                        alt=""
                        fill
                    />
                )}
                {!image && '?'}
            </div>
            <span className={styles['item-name']}>
                {name}
            </span>
        </button>
    )
}