import styles from '../../styles/Navbar.module.scss';
import { NavbarName } from './NavbarName';
import { NavbarProfile } from './NavbarProfile';
import { NavbarTabs } from './NavbarTabs';

export default function Navbar() {
    return(
        <header className={styles['container']}>
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