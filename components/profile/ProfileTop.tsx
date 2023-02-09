import styles from '../../styles/Profile.module.scss';
import { selectTopArtists, selectTopArtistsTimeFrame, selectTopTracks, selectTopTracksTimeFrame } from "@/redux/profile/selectors";
import { useAppSelector } from "@/redux/store";
import { Artist, Track } from "@/types";
import { ProfileTopItem } from "./ProfileTopItem";
import { useState } from 'react';

const NON_EXPANDED_COUNT = 6;

const getItemImage = (type: 'artists' | 'tracks', item: Track | Artist) => {
    if(type === 'artists') return (item as Artist).images[1].url;
    return (item as Track).album.images[1].url;
}
export const ProfileTop: React.FC<{
    type: 'artists' | 'tracks';
}> = ({ type }) => {
    const timeFrame = useAppSelector(state => 
        type === 'artists' ? selectTopArtistsTimeFrame(state) : selectTopTracksTimeFrame(state)
    )
    const items = useAppSelector(state => 
        type === 'artists' ? selectTopArtists(state, timeFrame) : selectTopTracks(state, timeFrame)
    );

    const [expanded, setExpanded] = useState(false);

    return(
        <>
        <h2 className={styles['top-header']}>
            Your most played {type}
        </h2>
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
        </ul>
        </>
    )
}