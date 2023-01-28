import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './ParamTabs.module.scss';

export default function ParamTabs({ tabs, defaultActive }: {
    tabs: string[];
    defaultActive: string;
}) {
    const router = useRouter();
    const path = router.basePath;
    const { tab: activeTab=defaultActive.toLowerCase() } = router.query as { tab: string };
    const tabIndex = tabs.map(t => t.toLowerCase()).indexOf(activeTab);
    const stripe = useRef<HTMLDivElement>(null);

    // Changing tab
    const changeTab = (tab: string) => {
        router.push(`${path}?tab=${tab}`, undefined, { shallow: true });
    }

    // Updating stripe
    useEffect(() => {
        if(!stripe.current) return;
        stripe.current.style.left = `${tabIndex * 50}%`;
    }, [tabIndex]);

    return(
        <ul className={styles['tabs']}>
            {tabs.map(tab => {
                const active = tab.toLowerCase() === activeTab.toLowerCase();

                const className = [
                    styles['tab'],
                    active ? styles['active-tab'] : ''
                ].join(' ');
                return(
                    <li 
                        className={className} 
                        key={tab}
                    >
                        <button onClick={() => changeTab(tab.toLowerCase())}>
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