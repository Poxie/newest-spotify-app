import { useEffect, useRef, useState } from 'react';
import { Input } from '../input';
import styles from './Dropdown.module.scss';

export const Dropdown: React.FC<{
    items: string[];
    onChange: (item: string) => void;
    defaultSelected?: string;
    allowSearch?: boolean;
    resultsPosition?: 'left' | 'center' | 'right';
}> = ({ items, onChange, defaultSelected, allowSearch, resultsPosition='left' }) => {
    const [selected, setSelected] = useState(defaultSelected || items[0]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Selecting new item
    const selectItem = (item: string) => {
        setSelected(item);
        onChange(item);
        setOpen(false);
        setSearch('');
    }

    // Closing on click outside component
    const checkForClickOutside = (e: MouseEvent) => {
        // @ts-ignore: this works
        if(ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', checkForClickOutside);
        return () => document.removeEventListener('mousedown', checkForClickOutside);
    }, []);

    const selectableItems = !search ? items : items.filter(item => item.toLowerCase().includes(search.toLowerCase()));

    const className = [
        styles['container'],
        styles[resultsPosition]
    ].join(' ')
    return(
        <div className={className} ref={ref}>
            <button 
                className={styles['selected']}
                onClick={() => setOpen(!open)}
            >
                {selected}
            </button>

            {open && (
                <ul>
                    {allowSearch && (
                        <Input 
                            label={'Search'}
                            name="search"
                            containerClassName={styles['search']}
                            onChange={setSearch}
                        />
                    )}
                    {selectableItems.map(item => (
                        <li 
                            onClick={() => selectItem(item)}
                            key={item}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}