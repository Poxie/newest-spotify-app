import { useAuth } from '@/contexts/auth/AuthProvider';
import { Artist, Track } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { SearchResult as SearchResultType } from './';
import styles from './SearchInput.module.scss';
import { SearchResult } from './SearchResult';

type ResultItem = {
    id: string;
    name: string;
    image: string;
    extra: string;
    fullItem: SearchResultType;
}
export const SearchResults: React.FC<{
    query: string;
    type: 'track' | 'artist';
    onClick: (result: SearchResultType) => void;
}> = ({ query, type, onClick }) => {
    const { get } = useAuth();
    const [results, setResults] = useState<ResultItem[]>([]);
    
    const getSearchResults = useCallback(async (query: string, type: 'track' | 'artist') => {
        const response = await get<{
            artists?: {
                items: Artist[];
            }
            tracks?: {
                items: Track[];
            }
        }>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search?q=${query}&type=${type}`);
        
        const items = response.artists?.items || response.tracks?.items || [];
        
        const getSpecificProps = (item: Track | Artist, type: 'track' | 'artist') => {
            // If is track, return track specific props
            if(type === 'track') return {
                image: (item as Track).album.images[1]?.url,
                extra: `Popularity ${(item as Track).popularity}`
            }
            // Else return artist specific props
            return {
                image: (item as Artist).images[1]?.url,
                extra: `${(item as Artist).followers.total.toLocaleString()} followers`
            }
        }

        const resultItems = items.map(item => ({
            id: item.id,
            name: item.name,
            fullItem: item,
            ...getSpecificProps(item, type)
        }));

        return resultItems;
    }, []);

    // Fetching results based on query
    useEffect(() => {
        getSearchResults(query, type)
            .then(results => {
                setResults(results);
            })
    }, [query, type]);

    return(
        <div className={styles['results']}>
            {results.map(result => (
                <SearchResult 
                    {...result}
                    onClick={() => onClick(result.fullItem)}
                    key={result.id}
                />
            ))}
        </div>
    )
}