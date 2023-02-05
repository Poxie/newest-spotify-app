import styles from '../../styles/Explore.module.scss';

export const ExploreSubHeader: React.FC<{
    text: string;
}> = ({ text }) => {
    return(
        <span className={styles['header']}>
            {text}
        </span>
    )
}