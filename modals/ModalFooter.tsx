import Button from '@/components/button';
import { useModal } from '@/contexts/modal/ModalProvider';
import styles from './Modals.module.scss';

export const ModalFooter: React.FC<{
    onConfirm?: () => void;
    confirmLabel?: string;
    onCancel?: () => void;
    cancelLabel?: string;
    closeOnCancel?: boolean;
    closeOnConfirm?: boolean;
}> = ({ onCancel, onConfirm, closeOnCancel, closeOnConfirm, confirmLabel='Confirm', cancelLabel='Cancel' }) => {
    const { close } = useModal();
    
    return(
        <div className={styles['footer']}>
            <Button 
                type={'transparent'}
                onClick={() => {
                    if(closeOnCancel) close();
                    if(onCancel) onCancel();
                }}
            >
                {cancelLabel}
            </Button>
            <Button 
                type={'transparent'}
                onClick={() => {
                    if(closeOnConfirm) close();
                    if(onConfirm) onConfirm();
                }}
            >
                {confirmLabel}
            </Button>
        </div>
    )
}