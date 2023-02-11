import { useModal } from "@/contexts/modal/ModalProvider";
import { ExtraAccessModal } from "@/modals/extra-access";
import { PlaylistsModal } from "@/modals/playlists";
import { Track } from "@/types";
import Image from "next/image";
import styles from './Player.module.scss';
import { PlayerButton } from "./PlayerButton";
import { PlayerControls } from "./PlayerControls";
import { PlayerMain } from "./PlayerMain";
import { PlayerPlaylistButton } from "./PlayerPlaylistButton";

export const Player: React.FC<Partial<Track> & {
    className?: string;
    loading?: boolean;
}> = ({ loading, uri, preview_url, id, name, artists, album, className }) => {
    const { setModal } = useModal();

    className = [
        styles['container'],
        className ? className : ''
    ].join(' ');
    
    // Showing loading placeholder
    if(loading || !album || !artists || !name || !uri || !id) {
        return(
            <div className={className}>
                <div className={styles['image']}/>
                <div className={styles['main']}>
                    <PlayerButton />
                    <div className={styles['text']}>
                        <div className={styles['name-loading']} />
                        <div className={styles['artist-loading']} />
                    </div>
                </div>
                <PlayerControls />
            </div>
        )
    }

    const image = album.images[1];
    const artist = artists[0];
    return(
        <div className={className}>
            <PlayerPlaylistButton 
                uri={uri}
            />
            <a 
                className={styles['image']}
                href={uri}
                aria-label="Go to song"
            >
                <Image 
                    src={image?.url}
                    alt={``}
                    sizes="200px"
                    fill
                />
            </a>
            <PlayerMain 
                name={name}
                artist={artist.name}
                uri={uri}
                previewURL={preview_url}
            />
        </div>
    )
}