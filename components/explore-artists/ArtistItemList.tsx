import styles from '../../styles/Explore.module.scss';
import { Album, Track } from "@/types";
import { ArtistListItem } from './ArtistListItem';

const PLACEHOLDER_AMOUNT = 10;
export const ArtistItemList: React.FC<{
    numbered?: boolean;
    items?: Album[] | Track[];
    header: string;
}> = ({ numbered, items, header }) => {
    // Adding placeholders if items are not present
    if(!items) items = Array.from(Array(PLACEHOLDER_AMOUNT));

    return(
        <div>
            <span className={styles['item-list-header']}>
                {header}
            </span>
            <ul className={styles['item-list']}>
                {items?.map((item, key) => (
                    <ArtistListItem 
                        item={item}
                        numbered={numbered}
                        index={key + 1}
                        key={key + 1}
                    />
                ))}
            </ul>
        </div>
    )
}