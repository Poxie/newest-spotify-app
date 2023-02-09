import { setProfileTopTimeFrame } from '@/redux/profile/actions';
import { useAppDispatch } from '@/redux/store';
import { TopTimeFrame } from '@/types';
import styles from '../../styles/Profile.module.scss';
import Button from '../button';
import { Dropdown } from '../dropdown';

const TIME_FRAMES = {
    'long_term': 'All time',
    'medium_term': 'Last 6 months',
    'short_term': 'Last 4 weeks'
}
const DROPDOWN_ITEMS = Object.values(TIME_FRAMES);
const getTimeFrameFromString = (readableTime: string) => {
    if(readableTime === DROPDOWN_ITEMS[0]) return 'long_term';
    if(readableTime === DROPDOWN_ITEMS[1]) return 'medium_term';
    return 'short_term';
}

export const ProfileTopHeader: React.FC<{
    type: 'artists' | 'tracks';
    expanded: boolean;
    toggleExpanded: () => void;
    activeTimeFrame: TopTimeFrame;
}> = ({ type, expanded, toggleExpanded, activeTimeFrame }) => {
    const dispatch = useAppDispatch();

    const changeTimeFrame = (readableTimeFrame: TopTimeFrame) => {
        const timeFrame = getTimeFrameFromString(readableTimeFrame);
        dispatch(setProfileTopTimeFrame(type, timeFrame));
    }

    return(
        <div className={styles['top-header']}>
            <div className={styles['top-header-main']}>
                <h2>
                    Your most played {type}
                </h2>
                <Dropdown 
                    items={DROPDOWN_ITEMS}
                    onChange={timeFrame => changeTimeFrame(timeFrame as TopTimeFrame)}
                    defaultSelected={TIME_FRAMES[activeTimeFrame]}
                />
            </div>
            <Button 
                type={'transparent'}
                onClick={toggleExpanded}
                className={styles['top-header-button']}
            >
                Show {expanded ? 'less' : 'more'}
            </Button>
        </div>
    )
}