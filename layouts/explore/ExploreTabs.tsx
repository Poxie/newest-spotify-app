import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './ExploreLayout.module.scss';

const tabs = ['Songs', 'Artists'];
export const ExploreTabs = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs.find(tab => router.pathname.includes(tab.toLocaleLowerCase())) || tabs[0]);
    const tabIndex = tabs.indexOf(activeTab);
    const stripe = useRef<HTMLDivElement>(null);

    // Changing tab
    const changeTab = (tab: string) => {
        router.push(`/explore/${tab.toLowerCase()}`, undefined, { shallow: true });
        setActiveTab(tab);
    }

    // Updating stripe
    useEffect(() => {
        if(!stripe.current) return;
        stripe.current.style.left = `${tabIndex * 50}%`;
    }, [tabIndex]);

    return(
        <ul className={styles['tabs']}>
            {tabs.map(tab => {
                const active = tab === activeTab;

                const className = [
                    styles['tab'],
                    active ? styles['active-tab'] : ''
                ].join(' ');
                return(
                    <li 
                        className={className} 
                        key={tab}
                    >
                        <button onClick={() => changeTab(tab)}>
                            {tab}
                        </button>
                    </li>
                )
            })}

            <div 
                className={styles['tab-stripe']}
                aria-hidden="true"
                ref={stripe}
            />
        </ul>
    )
}