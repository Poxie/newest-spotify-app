import styles from './SearchInput.module.scss';
import { Input } from "../input"
import { useState } from 'react';
import { SearchResults } from './SearchResults';
import { Artist, Track } from '@/types';

export const SearchInput: React.FC<{
    type: 'track' | 'artist';
    onChange: (result: Artist | Track) => void;
}> = ({ type, onChange }) => {
    const [query, setQuery] = useState('');
    const [focus, setFocus] = useState(false);

    const setFocusTrue = () => setFocus(true);
    const setFocusFalse = () => setTimeout(() => {
        setFocus(false);
    }, 150);

    return(
        <div className={styles['container']}>
            <Input 
                inputClassName={styles['input']}
                label={`Select ${type}`}
                onChange={setQuery}
                onFocus={setFocusTrue}
                onBlur={setFocusFalse}
                name={type}
            />

            {focus && query && (
                <SearchResults 
                    onClick={onChange}
                    query={query}
                    type={type}
                />
            )}
        </div>
    )
}