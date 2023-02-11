import styles from './Playlists.module.scss';
import { useAuth } from "@/contexts/auth/AuthProvider";
import { selectProfileModifyToken } from "@/redux/profile/selectors";
import { useAppSelector } from "@/redux/store";
import { PlayList } from "@/types";
import { useEffect, useState } from "react";
import Modal from "..";
import { ModalFooter } from "../ModalFooter";
import { ModalHeader } from "../ModalHeader";
import { PlaylistItem } from "./PlaylistItem";
import { useModal } from '@/contexts/modal/ModalProvider';
import { useToast } from '@/contexts/toast/ToastProvider';

const PLACEHOLDER_COUNT = 20;
export const PlaylistsModal: React.FC<{
    trackUri: string;
}> = ({ trackUri }) => {
    const { close } = useModal();
    const { get, post } = useAuth();
    const { setToast } = useToast();
    const modifyToken = useAppSelector(selectProfileModifyToken);
    const [items, setItems] = useState<PlayList[] | null>(null);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetching playlists
    useEffect(() => {
        get<{ items: PlayList[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/playlists`)
            .then(({ items }) => {
                setItems(items);
            })
    }, [modifyToken]);

    // Adding track to playlist
    const addToPlaylist = async () => {
        if(!activeItem) return;

        setLoading(true);
        const response = await post<{ snapshot_id: string }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${activeItem}/tracks`, { uris: [trackUri] });
        
        // Success
        if(response.snapshot_id) {
            setToast({
                text: 'Added song to playlist',
                type: 'info'
            })
            close();
            return;
        }

        // Error
        setToast({
            text: 'Error adding song to playlist',
            type: 'error'
        })
    }

    return(
        <Modal>
            <ModalHeader>
                Add track to playlist
            </ModalHeader>
            
            <div className={styles['items']}>
                {items?.map(item => (
                    <PlaylistItem 
                        playlist={item}
                        active={item.id === activeItem}
                        onClick={setActiveItem}
                        key={item.id}
                    />
                ))}

                {!items && (
                    Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                        <PlaylistItem key={key} />
                    ))
                )}
            </div>

            <ModalFooter 
                confirmLabel={'Add to playlist'}
                onConfirm={activeItem ? addToPlaylist : undefined}
                confirmDisabled={loading}
                closeOnCancel
            />
        </Modal>
    )
}