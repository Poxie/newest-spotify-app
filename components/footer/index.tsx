import styles from '../../styles/Footer.module.scss';

export default function Footer() {
    return(
        <footer className={styles['container']}>
            <span>
                All information on this page is fetched from Spotify.
            </span>
        </footer>
    )
}