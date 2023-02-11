import styles from './SearchInput.module.scss';
import Image from "next/image";

export const SearchResult: React.FC<{
    id: string;
    name: string;
    image: string;
    extra: string;
    onClick: () => void;
}> = ({ id, onClick, name, image, extra }) => {
    return(
        <div 
            className={styles['result']} 
            onClick={onClick}
        >
            <div className={styles['result-image']}>
                <Image 
                    src={image}
                    height={60}
                    width={60}
                    alt=""
                />
            </div>
            <div className={styles['result-text']}>
                <span>
                    {name}
                </span>
                <span className={styles['result-extra']}>
                    {extra}
                </span>
            </div>
        </div>
    )
}