import styles from '../../styles/Explore.module.scss';
import { setExploreArtist, setExploreSong } from "@/redux/explore/actions"
import { selectExploreArtist, selectExploreSong } from "@/redux/explore/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Artist, Track } from "@/types";
import { SearchInput } from "../search-input"
import { ExploreSongsPreview } from "./ExploreSongsPreview";

export const ExploreSongsSelectors = () => {
    const dispatch = useAppDispatch();
    
    const song = useAppSelector(selectExploreSong);
    const artist = useAppSelector(selectExploreArtist);

    const setSong = (song: Track) => dispatch(setExploreSong(song));
    const setArtist = (artist: Artist) => dispatch(setExploreArtist(artist));

    return(
        <div className={styles['selectors']}>
            <div className={styles['selector']}>
                <ExploreSongsPreview 
                    image={song?.album?.images[1]?.url}
                    textPrimary={song?.name}
                    textSecondary={song?.artists.map(artist => artist.name).join(', ')}
                    loading={!song}
                />
                <SearchInput 
                    onChange={result => setSong(result as Track)}
                    type={'track'}
                />
            </div>
            <div className={styles['selector']}>
                <ExploreSongsPreview 
                    image={artist?.images[1]?.url}
                    textPrimary={artist?.name}
                    textSecondary={`${artist?.followers?.total?.toLocaleString()} followers`}
                    loading={!artist}
                />
                <SearchInput 
                    onChange={result => setArtist(result as Artist)}
                    type={'artist'}
                />
            </div>
        </div>
    )
}