import styles from './Modals.module.scss';
import { motion } from 'framer-motion';

export default function Modal({
    children
}: {
    children: any;
}) {
    return(
        <motion.div 
            className={styles['container']}
            animate={{ opacity: 1, scale: 1, translateX: `-50%`, translateY: `-50%` }}
            initial={{ opacity: 0, scale: .4, translateX: `-50%`, translateY: `-50%` }}
            exit={{ opacity: 0, scale: .4, translateX: `-50%`, translateY: `-50%` }}
            transition={{ duration: .3 }}
        >
            {children}
        </motion.div>
    )
}