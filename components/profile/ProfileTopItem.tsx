import styles from '../../styles/Profile.module.scss';
import Image from "next/image";

export const ProfileTopItem: React.FC<{
    text: string;
    image: string;
    uri: string;
    index: number;
    type: 'artists' | 'tracks';
}> = ({ text, image, uri, index, type }) => {
    return(
        <li className={styles['top-item']}>
            <a 
                className={styles['item-image']}
                href={uri}
                aria-label={`Go to ${type.slice(0, type.length - 1)}`}
            >
                <Image 
                    src={image}
                    fill
                    sizes="150px"
                    alt=""
                />
            </a>
            <a href={uri}>
                {text}
            </a>
        </li>
    )
}