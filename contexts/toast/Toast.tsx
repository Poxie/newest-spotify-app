import styles from './Toast.module.scss';
import { motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { DEFAULT_TOAST_DURATION } from './constants';
import { Toast as ToastType } from './types';

export const Toast: React.FC<ToastType> = ({ text, type='info', duration=DEFAULT_TOAST_DURATION }) => {
    const className = [
        styles['container'],
        styles[type]
    ].join(' ');
    return(
        <motion.div 
            className={className}
            initial={{ translateY: '150%' }}
            exit={{ translateY: '150%' }}
            animate={{ translateY: 0 }}
            style={{ '--animation-duration': `${duration}ms` } as CSSProperties}
        >
            {text}
        </motion.div>
    )
}