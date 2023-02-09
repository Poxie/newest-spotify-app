import styles from '../../styles/Profile.module.scss';
import { ProfileRecommendationsItems } from './ProfileRecommendationsItems';
import { ProfileRecommendationsHeader } from './ProfileRecommendationsHeader';

export const ProfileRecommendations = () => {
    return(
        <section className={styles['recommendations']}>
            <ProfileRecommendationsHeader />
            <ProfileRecommendationsItems />
        </section>
    )
}