import styles from '../../styles/Navbar.module.scss';
import { NavbarTab } from "./NavbarTab"

const TABS = [
    { text: 'Top lists', path: '/top-lists' },
    { text: 'Explore', path: '/explore/songs', activePaths: ['/explore/songs', '/explore/artists'] },
    { text: 'Profile', path: '/profile' }
]
export const NavbarTabs = () => {
    return(
        <ul className={styles['tabs']}>
            {TABS.map(tab => (
                <NavbarTab 
                    {...tab}
                    key={tab.path}
                />
            ))}
        </ul>
    )
}