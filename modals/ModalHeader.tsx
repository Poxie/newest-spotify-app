import { CloseIcon } from '@/assets/icons/CloseIcon';
import { useModal } from '@/contexts/modal/ModalProvider';
import styles from './Modals.module.scss';

export const ModalHeader: React.FC<{
    children: any;
}> = ({ children }) => {
    const { close } = useModal();

    return(
        <div className={styles['header']}>
            <p className={styles['header-text']}>
                {children}
            </p>
            <button 
                className={styles['close-button']}
                onClick={close}
            >
                <CloseIcon />
            </button>
        </div>
    )
}