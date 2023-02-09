import { selectProfileToken, selectProfileTokenLoading } from '@/redux/profile/selectors';
import { useAppSelector } from '@/redux/store';
import styles from '../../styles/Navbar.module.scss';
import Button from "../button"

export const NavbarProfile = () => {
    const token = useAppSelector(selectProfileToken);
    const tokenLoading = useAppSelector(selectProfileTokenLoading);

    if(!token || tokenLoading) {
        return(
            <Button 
                className={styles['button']}
                href={`/login`}
            >
                {tokenLoading ? '' : 'Login with Spotify'}
            </Button>
        )
    }

    const signOut = async () => {
        window.localStorage.clear();
        window.location.href = window.location.origin;
    }

    return(
        <Button 
            className={styles['button']}
            onClick={signOut}
        >
            Sign out from Spotify
        </Button>
    )
}