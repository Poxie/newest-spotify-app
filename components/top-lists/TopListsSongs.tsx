import styles from '../../styles/TopLists.module.scss';
import { useAppSelector } from "@/redux/store"
import { selectCountryTracks } from "@/redux/top-lists/selectors";
import { useRouter } from "next/router";
import { Player } from "../player";

export const TopListsSongs = () => {
    const query = useRouter().query as { country?: string };
    const country = query.country ? query.country : 'Global';
    const tracks = useAppSelector(state => selectCountryTracks(state, country));

    // If tracks are not present, replace with loading skeleton
    if(!tracks?.length) {
        return(
            <div className={styles['header-tracks']}>
                {Array.from(Array(4)).map((_,key) => (
                    <Player loading />
                ))}
            </div>
        )
    }

    const topTracks = tracks?.slice(0,4);
    return(
        <div className={styles['header-tracks']}>
            {topTracks?.map(track => (
                <Player 
                    {...track}
                    key={track.id}
                />
            ))}
        </div>
    )
}