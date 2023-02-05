import { useAuth } from "@/contexts/auth/AuthProvider"
import { setArtistInfo } from "@/redux/explore/actions";
import { ArtistInfo } from "@/redux/explore/types";
import { useAppDispatch } from "@/redux/store";
import { Artist } from "@/types"
import { SearchInput } from "../search-input"

export const ExploreArtistsSelector = () => {
    const { get } = useAuth();
    const dispatch = useAppDispatch();

    const onChange = async (artist: Artist) => {
        // Creating requests info array
        const requests = [
            { request: get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/artists/${artist.id}/top-tracks?market=US`), responseKey: 'tracks' },
            { request: get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/artists/${artist.id}/albums?limit=50`), responseKey: 'items' },
            { request: get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/artists/${artist.id}/related-artists`), responseKey: 'artists' },
        ]

        // Fetching the requests
        const responses: any[] = await Promise.all(requests.map(item => item.request));
        
        // Getting the response data from requests
        const tracks = responses[0][requests[0].responseKey];
        const albums = responses[1][requests[1].responseKey];
        const artists = responses[2][requests[2].responseKey];

        // Combining them into an artistInfo object
        const artistInfo: ArtistInfo = {
            artist,
            tracks,
            albums,
            relatedArtists: artists
        }

        // Updating redux store
        dispatch(setArtistInfo(artistInfo));
    }

    return(
        <SearchInput 
            type="artist"
            onChange={artist => onChange(artist as Artist)}
        />
    )
}