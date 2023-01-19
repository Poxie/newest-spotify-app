import { HamIcon } from '@/assets/icons/HamIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import { NavbarName } from './NavbarName';
import { NavbarProfile } from './NavbarProfile';
import { NavbarTabs } from './NavbarTabs';

const LIGHT_PATHS = ['/'];
export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // If path change, make sure to close mobile nav
    useEffect(() => setOpen(false), [router.asPath]);

    const className = [
        styles['container'],
        LIGHT_PATHS.find(path => path === router.asPath) ? styles['light'] : '',
        open ? styles['open'] : ''
    ].join(' ');
    return(
        <header className={className}>
            <nav className={styles['content']}>
                <NavbarName />
                <div className={styles['right']}>
                    <NavbarTabs />
                    <NavbarProfile />
                </div>
                <div 
                    className={styles['ham']}
                    onClick={() => setOpen(!open)}
                >
                    <HamIcon />
                </div>
            </nav>
        </header>
    )
}