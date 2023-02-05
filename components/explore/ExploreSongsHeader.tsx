import styles from '../../styles/Explore.module.scss';

export const ExploreSongsHeader = () => {
    return(
        <span className={styles['songs-header']}>
            Get songs related to a particular song and artist. We will suggest songs you may like based of your input.
        </span>
    )
}