import { useRouter } from 'next/router';
import styles from '../../styles/Navbar.module.scss';
import { NavbarName } from './NavbarName';
import { NavbarProfile } from './NavbarProfile';
import { NavbarTabs } from './NavbarTabs';

const LIGHT_PATHS = ['/'];
export default function Navbar() {
    const router = useRouter();

    const className = [
        styles['container'],
        LIGHT_PATHS.find(path => path === router.asPath) ? styles['light'] : ''
    ].join(' ');
    return(
        <header className={className}>
            <nav className={styles['content']}>
                <NavbarName />
                <div className={styles['right']}>
                    <NavbarTabs />
                    <NavbarProfile />
                </div>
            </nav>
        </header>
    )
}