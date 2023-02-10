import styles from '../../modals/Modals.module.scss';
import React, { ReactElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalContext = React.createContext({} as {
    setModal: (modal: ReactElement) => void;
    close: () => void;
});

export const useModal = () => React.useContext(ModalContext);

export const ModalProvider: React.FC<{
    children: ReactElement[];
}> = ({ children }) => {
    const [modal, setModal] = useState<ReactElement | null>(null);

    const _setModal = (modal: ReactElement) => {
        setModal(modal);
    }

    const close = () => setModal(null);

    const value = {
        setModal: _setModal,
        close
    }
    return(
        <ModalContext.Provider value={value}>
            {children}

            <AnimatePresence>
                {modal && (
                    <>
                    <motion.div 
                        className={styles['backdrop']}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />
                    {modal}
                    </>
                )}
            </AnimatePresence>
        </ModalContext.Provider>
    )
}