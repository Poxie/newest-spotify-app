import { setProfileTopTimeFrame } from '@/redux/profile/actions';
import { useAppDispatch } from '@/redux/store';
import { TopTimeFrame } from '@/types';
import styles from '../../styles/Profile.module.scss';
import Button from '../button';
import TimeFrameDropdown from '../time-frame-dropdown';

export const ProfileTopHeader: React.FC<{
    type: 'artists' | 'tracks' | 'genres';
    expanded: boolean;
    toggleExpanded: () => void;
    activeTimeFrame: TopTimeFrame;
}> = ({ type, expanded, toggleExpanded, activeTimeFrame }) => {
    const dispatch = useAppDispatch();

    const changeTimeFrame = (timeFrame: TopTimeFrame) => {
        dispatch(setProfileTopTimeFrame(type, timeFrame));
    }

    return(
        <div className={styles['top-header']}>
            <div className={styles['top-header-main']}>
                <h2>
                    Your most played {type}
                </h2>
                <TimeFrameDropdown 
                    defaultActive={activeTimeFrame}
                    onChange={changeTimeFrame}
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