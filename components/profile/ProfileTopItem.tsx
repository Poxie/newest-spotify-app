import styles from '../../styles/Profile.module.scss';
import Image from "next/image";

export const ProfileTopItem: React.FC<{
    text: string;
    image: string;
    uri: string;
    index: number;
}> = ({ text, image, uri, index }) => {
    return(
        <div className={styles['top-item']}>
            <a 
                className={styles['item-image']}
                href={uri}
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
        </div>
    )
}