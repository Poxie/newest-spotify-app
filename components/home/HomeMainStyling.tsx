import styles from '../../styles/Home.module.scss';
import { WaveIcon } from "@/assets/icons/WaveIcon"
import Image from "next/image"

export const HomeMainStyling = () => {
    return(
        <>
        <Image 
            className={styles['background-image']}
            src={'/home.png'}
            alt=''
            priority
            fill
        />
        <WaveIcon />
        </>
    )
}