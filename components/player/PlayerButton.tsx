import styles from './Player.module.scss';
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { usePlayer } from "./PlayerMain"

export const PlayerButton = () => {
    const { playing, togglePlay } = usePlayer();
    
    return(
        <button 
            onClick={togglePlay}
            className={styles['play-button']}
        >
            {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
    )
}