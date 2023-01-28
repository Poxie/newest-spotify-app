import styles from '../../styles/TopLists.module.scss';
import { TopListsHeader } from "./TopListsHeader";
import { TopListsSongs } from './TopListsSongs';

export const TopListsMain = () => {
    return(
        <section className={styles['main']}>
            <TopListsHeader />
            <TopListsSongs />
        </section>
    )
}