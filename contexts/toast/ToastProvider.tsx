import React, { ReactElement, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DEFAULT_TOAST_DURATION, TOAST_ANIMATION_DURATION } from './constants';
import { Toast } from './Toast';
import { Toast as ToastType, ToastContext as ToastContextType } from './types';

const ToastContext = React.createContext({} as ToastContextType)

export const useToast = () => React.useContext(ToastContext);

export const ToastProvider: React.FC<{
    children: ReactElement | ReactElement[];
}> = ({ children }) => {
    const [toast, setToast] = useState<null | ToastType>(null);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const hasToast = useRef(false);
    
    const _setToast = (newToast: ToastType) => {
        // If there is a toast present
        if(hasToast.current) {
            // Closing previous toast
            close();

            // Waiting for previous toast to disappear, then display new toast
            setTimeout(() => _setToast(newToast), TOAST_ANIMATION_DURATION);

            return;
        }
        
        setToast(newToast);
        hasToast.current = true;

        // Closing after duration
        timeout.current = setTimeout(close, newToast.duration || DEFAULT_TOAST_DURATION);
    }
    const close = () => {
        // Resetting toast states
        setToast(null);
        hasToast.current = false;

        // Clearing close timeout for previous toast
        if(timeout.current) clearTimeout(timeout.current);
    }

    const value = {
        setToast: _setToast
    };
    return(
        <ToastContext.Provider value={value}>
            {children}
            
            <AnimatePresence>
                {toast && <Toast {...toast} />}
            </AnimatePresence>
        </ToastContext.Provider>
    )
}