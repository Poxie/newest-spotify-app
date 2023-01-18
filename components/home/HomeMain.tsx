import styles from '../../styles/Home.module.scss';
import { HomeMainStyling } from "./HomeMainStyling"
import { HomeMainText } from './HomeMainText';

export const HomeMain = () => {
    return(
        <div className={styles['main']}>
            <HomeMainStyling />
            <HomeMainText />
        </div>
    )
}