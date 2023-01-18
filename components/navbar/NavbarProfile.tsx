import styles from '../../styles/Navbar.module.scss';
import Button from "../button"

export const NavbarProfile = () => {
    return(
        <Button className={styles['button']}>
            Login with Spotify
        </Button>
    )
}