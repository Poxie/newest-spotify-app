import Modal from ".."
import { ModalFooter } from "../ModalFooter"
import { ModalHeader } from "../ModalHeader"

export const ExtraAccessModal: React.FC<{
    onAccessConfirmed?: () => void;
}> = ({ onAccessConfirmed }) => {
    const onConfirm = () => {
        window.open(`${window.location.origin}/login?type=modify`);
        if(onAccessConfirmed) onAccessConfirmed(); 
    }

    return(
        <Modal>
            <ModalHeader>
                Extra access is needed
            </ModalHeader>
            <span>
                In order to add tracks to your playlists we need extra access. We will only add tracks to playlists, and only if you agree to add the track.
            </span>
            <ModalFooter 
                onConfirm={onConfirm}
                closeOnCancel
                closeOnConfirm
            />
        </Modal>
    )
}