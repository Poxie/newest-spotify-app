import styles from './ExploreLayout.module.scss';
import { ReactElement } from "react"
import { ExploreHeader } from './ExploreHeader';
import { ExploreTabs } from './ExploreTabs';

export const ExploreLayout: React.FC<{
    children: ReactElement;
}> = ({ children }) => {
    return(
        <main className={styles['container']}>
            <ExploreHeader />
            <ExploreTabs />
            {children}
        </main>
    )
}