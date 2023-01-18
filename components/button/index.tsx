import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export default function Button({ children, style, onClick, href, ariaLabel, target, external=false, className='', type='default' }: {
    children: any;
    type?: 'default' | 'secondary' | 'hollow' | 'transparent';
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    ariaLabel?: string;
    target?: AnchorHTMLAttributes<''>['target'];
}) {
    className = [
        className,
        styles['container'],
        styles[type]
    ].join(' ');

    const props = {
        className,
        style,
        onClick,
        'aria-label': ariaLabel
    }
    const linkProps = {
        href: href || '',
        rel: 'noreferrer',
        target: target,
    }

    return href ? (
        external ? (
            <a 
                {...linkProps}
                {...props}
            >
                {children}
            </a>
        ) : (
            <Link 
                {...linkProps}
                {...props}
            >
                <a className={className}>
                    {children}
                </a>
            </Link>
        )
    ) : (
        <button {...props}>
            {children}
        </button>
    )
}