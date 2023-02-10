import styles from './Modals.module.scss';

export const ModalHeader: React.FC<{
    children: any;
}> = ({ children }) => {
    return(
        <p className={styles['header']}>
            {children}
        </p>
    )
}