import Link from 'next/link';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export default function Button({ children, style, onClick, href, ariaLabel, target, external=false, className='', type='default', buttonType='button' }: {
    children: any;
    type?: 'default' | 'secondary' | 'hollow' | 'transparent';
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    ariaLabel?: string;
    target?: AnchorHTMLAttributes<''>['target'];
    buttonType?: ButtonHTMLAttributes<''>['type']
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
        type: buttonType,
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
                {children}
            </Link>
        )
    ) : (
        <button {...props}>
            {children}
        </button>
    )
}