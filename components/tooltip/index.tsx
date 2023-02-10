import { ReactElement } from 'react';
import styles from './Tooltip.module.scss';

export default function Tooltip({
    content, children, className
}: {
    content: string;
    children: ReactElement;
    className?: string;
}) {
    className = [
        styles['tooltip'],
        className
    ].join(' ');
    return(
        <div 
            className={className} 
            data-tooltip-content={content}
            aria-label={content}
        >
            {children}
        </div>
    )
}