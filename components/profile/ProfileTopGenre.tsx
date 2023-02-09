import styles from '../../styles/Profile.module.scss';
import { ProfileTopGenre as ProfileTopGenreType } from "@/redux/profile/types"

export const ProfileTopGenre: React.FC<{
    genre: ProfileTopGenreType;
    largestCount: number;
    index: number;
}> = ({ genre, largestCount, index }) => {
    return(
        <li className={styles['genre']}>
            <span className={styles['genre-text']}>
                {index}. {genre.text}
            </span>
            <div className={styles['genre-graph-container']}>
                <div 
                    style={{ width: `${(genre.count / largestCount) * 100}%` }}
                    className={styles['genre-graph']}
                    aria-hidden="true"
                />
            </div>
        </li>
    )
}