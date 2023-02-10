import { PlaylistIcon } from "@/assets/icons/PlaylistIcon";
import styles from './Player.module.scss';
import Tooltip from "../tooltip";
import { useModal } from "@/contexts/modal/ModalProvider";
import { ExtraAccessModal } from "@/modals/extra-access";
import { PlaylistsModal } from "@/modals/playlists";

export const PlayerPlaylistButton: React.FC<{
    uri: string;
}> = ({ uri }) => {
    const { setModal } = useModal();

    const openPlaylistModal = () => {
        // Checking if we have necessary access tokens
        if(!window.localStorage.modifyToken) {
            setModal(
                <ExtraAccessModal 
                    onAccessConfirmed={() => setModal(<PlaylistsModal trackUri={uri} />)}
                />
            );
            return;
        }

        // Else open playlist modal
        setModal(<PlaylistsModal trackUri={uri} />)
    }

    return(
        <Tooltip 
            content={'Add to playlist'} 
            className={styles['playlist-button-container']}
        >
            <button 
                className={styles['playlist-button']}
                onClick={openPlaylistModal}
            >
                <PlaylistIcon />
            </button>
        </Tooltip>
    )
}