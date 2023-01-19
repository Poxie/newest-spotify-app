import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Button from '../button';
import { TileType } from "./HomeTiles";

export const HomeTile: React.FC<TileType> = ({ title, text, image, path, buttonText }) => {
    return(
        <li className={styles['tile']}>
            <div className={styles['tile-text']}>
                <h2>
                    {title}
                </h2>
                <p>
                    {text}
                </p>
                <Button href={path}>
                    {buttonText}
                </Button>
            </div>
            <div className={styles['tile-image']}>
                <Image 
                    src={image}
                    alt=""
                    fill
                />
            </div>
        </li>
    )
}