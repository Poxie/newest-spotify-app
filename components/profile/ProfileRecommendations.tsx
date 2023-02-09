import styles from '../../styles/Profile.module.scss';
import TimeFrameDropdown from '../time-frame-dropdown';
import { ProfileRecommendationsHeader } from './ProfileRecommendationsHeader';

export const ProfileRecommendations = () => {
    return(
        <div className={styles['recommendations']}>
            <ProfileRecommendationsHeader />
        </div>
    )
}