import styles from '../../styles/Profile.module.scss';
import { useAuth } from "@/contexts/auth/AuthProvider"
import { setProfileTop } from "@/redux/profile/actions";
import { selectTopArtists, selectTopTracks } from "@/redux/profile/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Artist, Track } from "@/types";
import { useEffect } from "react";
import { ProfileTop } from "./ProfileTop";

const DEFAULT_TIME_FRAME = 'long_term';
export const ProfileTops = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    // Fetching profile tops
    useEffect(() => {
        Promise.all([
            get<{ items: Track[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/top/tracks?time_range=${DEFAULT_TIME_FRAME}`),
            get<{ items: Artist[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/top/artists?time_range=${DEFAULT_TIME_FRAME}`)
        ]).then(([trackResponse, artistResponse]) => {
            dispatch(setProfileTop('artists', artistResponse.items, DEFAULT_TIME_FRAME));
            dispatch(setProfileTop('tracks', trackResponse.items, DEFAULT_TIME_FRAME));
        })
    }, []);
    
    return(
        <section className={styles['tops']}>
            <ProfileTop type="artists" />
            <ProfileTop type="tracks" />
        </section>
    )
}