import styles from '../../styles/Navbar.module.scss';
import { NavbarName } from './NavbarName';
import { NavbarTabs } from './NavbarTabs';

export default function Navbar() {
    return(
        <header className={styles['container']}>
            <nav className={styles['content']}>
                <NavbarName />
                <NavbarTabs />
            </nav>
        </header>
    )
}