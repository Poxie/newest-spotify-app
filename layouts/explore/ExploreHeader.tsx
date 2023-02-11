import styles from './ExploreLayout.module.scss';

export const ExploreHeader = () => {
    return(
        <h1 className={styles['header']}>
            Explore what <span className="underlined highlighted">YOU</span> love
        </h1>
    )
}