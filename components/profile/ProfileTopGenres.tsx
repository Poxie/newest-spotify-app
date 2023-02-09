import { useAuth } from "@/contexts/auth/AuthProvider";
import { setProfileTop } from "@/redux/profile/actions";
import { selectTopGenres, selectTopGenresTimeFrame, selectTopArtists } from "@/redux/profile/selectors";
import { ProfileTopGenre } from "@/redux/profile/types";
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Artist } from "@/types";
import { useEffect, useState } from "react";
import { ProfileTopHeader } from "./ProfileTopHeader"

const DEFAULT_TIME_FRAME = 'long_term';
export const ProfileTopGenres = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();
    const timeFrame = useAppSelector(selectTopGenresTimeFrame);
    const genres = useAppSelector(state => selectTopGenres(state, timeFrame));
    const artists = useAppSelector(state => selectTopArtists(state, timeFrame));
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // If artists are not fetched, and timeFrame is default, return
        // This since long_term artists are being fetched elsewhere
        if(!artists && timeFrame === DEFAULT_TIME_FRAME) return;

        // Else if artists are not fetched and timeFrame is not default, fetch artists
        if(!artists) {
            get<{ items: Artist[] }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/me/top/artists?time_range=${timeFrame}`)
                .then(({ items }) => {
                    dispatch(setProfileTop('artists', items, timeFrame));
                });

            return;
        }

        // Getting all genres
        const genres: string[] = [];
        for(const artist of artists) {
            genres.push(...artist.genres);
        }

        // Getting genre count
        const genreCounts: {[key: string]: ProfileTopGenre} = {};
        for (const genre of genres) {
            if (!genreCounts[genre]) {
                genreCounts[genre] = {
                    text: genre,
                    count: 1
                };
            } else {
                genreCounts[genre].count++;
            }
        }
        
        // Moving genre counts into sorted array
        const sortedGenres = Object.values(genreCounts).sort((a,b) => b.count - a.count);

        dispatch(setProfileTop('genres', sortedGenres, timeFrame));
    }, [timeFrame, artists]);
    
    return(
        <>
            <ProfileTopHeader 
                type={'genres'}
                activeTimeFrame={timeFrame}
                expanded={expanded}
                toggleExpanded={() => setExpanded(!expanded)}
            />
            {genres?.map(genre => genre.text)}
        </>
    )
}