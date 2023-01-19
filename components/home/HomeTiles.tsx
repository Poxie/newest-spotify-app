import styles from '../../styles/Home.module.scss';
import tiles from '../../assets/static/tiles.json';
import { HomeTile } from './HomeTile';
import { WaveIcon } from '@/assets/icons/WaveIcon';

export type TileType = typeof tiles[0];
export const HomeTiles = () => {
    return(
        <section className={styles['tile-section']}>
            <div className={styles['tiles']}>
                <h2>
                    All your music needs: right here, <br/>right now.
                </h2>

                <ul className={styles['tile-container']}>
                    {tiles.map((tile, key) => (
                        <HomeTile 
                            {...tile}
                            key={key}
                        />
                    ))}
                </ul>
            </div>
            <WaveIcon />
        </section>
    )
}