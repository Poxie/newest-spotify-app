import styles from '../../styles/Explore.module.scss';
import Image from "next/image";

export const ExploreSongsPreview: React.FC<{
    loading?: boolean;
    image?: string;
    textPrimary?: string;
    textSecondary?: string;
}> = ({ image, textPrimary, textSecondary, loading }) => {
    if(loading) {
        return(
            <div className={styles['selector-preview']}>
                <div className={styles['preview-image']} />
                <div>
                    <div className={styles['preview-title-loading']} />
                    <div className={styles['preview-subtitle-loading']} />
                </div>
            </div>
        )
    }

    return(
        <div className={styles['selector-preview']}>
            <div className={styles['preview-image']}>
                {image && (
                    <Image 
                        src={image}
                        width={100}
                        height={100}
                        alt=""
                    />
                )}
            </div>
            <div className={styles['preview-text']}>
                <span className={styles['preview-title']}>
                    {textPrimary}
                </span>
                <span className={styles['preview-subtitle']}>
                    {textSecondary}
                </span>
            </div>
        </div>
    )
}