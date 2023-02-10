import { ReactElement } from 'react';
import styles from './Tooltip.module.scss';

export default function Tooltip({
    content, children
}: {
    content: string;
    children: ReactElement;
}) {
    return(
        <div 
            className={styles['tooltip']} 
            data-tooltip-content={content}
            aria-label={content}
        >
            {children}
        </div>
    )
}