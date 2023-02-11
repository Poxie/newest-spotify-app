import styles from './Modals.module.scss';
import { motion } from 'framer-motion';
import { useScreenType } from '@/hooks/useScreenType';

export default function Modal({
    children
}: {
    children: any;
}) {
    const screenType = useScreenType();
    const small = screenType === 'small';

    const style = { 
        left: small ? 0 : '50%', 
        top: small ? 0 : '50%', 
        maxWidth: small ? '100%' : 'var(--width-main-max)', 
        borderRadius: small ? 0 : 'var(--border-radius-primary)',
        maxHeight: small ? '100vh' : 'var(--default-height)',
        height: small ? '100vh' : 'var(--default-height)'
    };
    const initial = { opacity: small ? 1 : 0, scale: small ? 1 : .4, translateX: small ? 0 : '-50%', translateY: small ? '150%' : '-50%' };
    const animate = { opacity: 1, scale: 1, translateX: small ? 0 : '-50%', translateY: small ? 0 : '-50%' };
    return(
        <motion.div 
            className={styles['container']}
            animate={animate}
            initial={initial}
            exit={initial}
            transition={{ duration: .3 }}
            style={style}
        >
            {children}
        </motion.div>
    )
}