import styles from '../../styles/Explore.module.scss';
import { SongsResults } from "./SongsResults"
import { SongsSelectors } from "./SongsSelectors"

export default function Songs() {
    return(
        <>
        <span className={styles['header']}>
            Get songs related to a particular song and artist. We will suggest songs you may like based of your input.
        </span>
        <SongsSelectors />
        <SongsResults />
        </>
    )
}