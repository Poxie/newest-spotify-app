import styles from '../../styles/TopLists.module.scss';
import { TopListsHeader } from "./TopListsHeader";

export const TopListsMain = () => {
    return(
        <section className={styles['main']}>
            <TopListsHeader />
        </section>
    )
}