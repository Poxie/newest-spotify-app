import styles from '../../styles/Explore.module.scss';
import { ExploreContent } from './ExploreContent';
import { ExploreHeader } from './ExploreHeader';
import { ExploreTabs } from './ExploreTabs';

export const ExploreMain = () => {
    return(
        <section className={styles['main']}>
            <ExploreHeader />
            <ExploreTabs />
            <ExploreContent />
        </section>
    )
}