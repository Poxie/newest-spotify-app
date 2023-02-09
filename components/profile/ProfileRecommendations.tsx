import styles from '../../styles/Profile.module.scss';
import TimeFrameDropdown from '../time-frame-dropdown';
import { ProfileRecommendationsItems } from './ProfikleRecommendationsItems';
import { ProfileRecommendationsHeader } from './ProfileRecommendationsHeader';

export const ProfileRecommendations = () => {
    return(
        <section className={styles['recommendations']}>
            <ProfileRecommendationsHeader />
            <ProfileRecommendationsItems />
        </section>
    )
}