import styles from '../../styles/Explore.module.scss'; 
import { Album, Track } from "@/types"
import Image from "next/image";

const getItemImage = (item: Album | Track) => {
    const image = (item as Track).album?.images[1]?.url || (item as Album).images[1]?.url;
    return image;
}
export const ExploreArtistListItem: React.FC<{
    item?: Album | Track;
    numbered?: boolean;
    index: number;
}> = ({ item, numbered, index }) => {
    // If item is not present, display loading skeleton
    if(!item) {
        return(
            <li className={styles['list-item']}>
                <div className={styles['list-item-image']} />
                <div className={styles['list-item-name-loading']} />
                {numbered && (
                    <div className={styles['list-item-number-loading']} />
                )}
            </li>
        )
    }

    return(
        <li className={styles['list-item']}>
            <a 
                className={styles['list-item-image']}
                href={item.uri}
            >
                <Image 
                    src={getItemImage(item)}
                    width={25}
                    height={25}
                    alt=""
                />
            </a>

            <a href={item.uri}>
                {item.name}
            </a>

            {numbered && (
                <span className={styles['list-item-number']}>
                    {index}
                </span>
            )}
        </li>
    )
}