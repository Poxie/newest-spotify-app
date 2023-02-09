import { setProfileRecommendationsTimeFrame } from '@/redux/profile/actions';
import { useAppDispatch } from '@/redux/store';
import { TopTimeFrame } from '@/types';
import styles from '../../styles/Profile.module.scss';
import TimeFrameDropdown from "../time-frame-dropdown"

export const ProfileRecommendationsHeader = () => {
    const dispatch = useAppDispatch();

    const changeTimeFrame = (type: 'artist' | 'track', timeFrame: TopTimeFrame) => {
        dispatch(setProfileRecommendationsTimeFrame(type, timeFrame));
    }

    return(
        <h2 className={styles['recommendations-header']}>
            Songs based on your top artists
            <TimeFrameDropdown 
                defaultActive='long_term'
                onChange={timeFrame => changeTimeFrame('artist', timeFrame)}
            />
            and songs
            <TimeFrameDropdown 
                defaultActive='long_term'
                onChange={timeFrame => changeTimeFrame('track', timeFrame)}
            />
        </h2>
    )
}