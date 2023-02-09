import styles from '../../styles/Profile.module.scss';
import Button from '../button';

export const ProfileTopHeader: React.FC<{
    type: string;
    expanded: boolean;
    toggleExpanded: () => void;
}> = ({ type, expanded, toggleExpanded }) => {
    return(
        <div className={styles['top-header']}>
            <div>
                <h2>
                    Your most played {type}
                </h2>
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