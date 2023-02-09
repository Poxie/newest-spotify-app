import styles from '../../styles/Profile.module.scss';
import { selectTopArtists, selectTopArtistsTimeFrame, selectTopTracks, selectTopTracksTimeFrame } from "@/redux/profile/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Artist, Track } from "@/types";
import { ProfileTopItem } from "./ProfileTopItem";
import { useEffect, useState } from 'react';
import { ProfileTopHeader } from './ProfileTopHeader';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { setProfileTop } from '@/redux/profile/actions';

const NON_EXPANDED_COUNT = 6;
const PLACEHOLDER_COUNT = 6;

const getItemImage = (type: 'artists' | 'tracks', item: Track | Artist) => {
    if(type === 'artists') return (item as Artist).images[1].url;
    return (item as Track).album.images[1].url;
}
export const ProfileTop: React.FC<{
    type: 'artists' | 'tracks';
}> = ({ type }) => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);

    // Getting relevant time frame and items
    const timeFrame = useAppSelector(state => 
        type === 'artists' ? selectTopArtistsTimeFrame(state) : selectTopTracksTimeFrame(state)
    )
    const items = useAppSelector(state => 
        type === 'artists' ? selectTopArtists(state, timeFrame) : selectTopTracks(state, timeFrame)
    );

    // If no items are already fetched, fetch new items
    useEffect(() => {
        if(items?.length) return;

        get<{ items: Track[] | Artist[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/top/${type}?time_range=${timeFrame}`)
            .then(({ items }) => {
                dispatch(setProfileTop(type, items, timeFrame));
            })
    }, [timeFrame]);

    return(
        <>
        <ProfileTopHeader 
            expanded={expanded}
            toggleExpanded={() => setExpanded(!expanded)}
            type={type}
            activeTimeFrame={timeFrame}
        />
        <ul className={styles['top-list']}>
            {items?.slice(0, expanded ? items.length : NON_EXPANDED_COUNT )?.map((item, key) => {
                return(
                    <ProfileTopItem 
                        text={item.name}
                        uri={item.uri}
                        image={getItemImage(type, item)}
                        index={key}
                        key={item.id}
                    />
                )
            })}

            {/* Showing loading skeletons */}
            {!items && (
                Array.from(Array(PLACEHOLDER_COUNT)).map((_,key) => (
                    <div className={styles['top-item']}>
                        <div className={styles['item-image']} />
                        <div className={styles['top-item-text-loading']} />
                    </div>
                ))
            )}
        </ul>
        </>
    )
}