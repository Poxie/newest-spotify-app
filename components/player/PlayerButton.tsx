import styles from './Player.module.scss';
import { PauseIcon } from "@/assets/icons/PauseIcon";
import { PlayIcon } from "@/assets/icons/PlayIcon";
import { usePlayer } from "./PlayerMain"

export const PlayerButton = () => {
    const { playing, togglePlay, errored } = usePlayer();
    
    return(
        <button 
            onClick={togglePlay}
            className={styles['play-button']}
            style={{ pointerEvents: errored ? 'none' : 'unset' }}
        >
            {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
    )
}