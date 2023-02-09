import styles from '../../styles/Profile.module.scss';
import { ProfileTop } from "./ProfileTop";
import { ProfileTopGenres } from './ProfileTopGenres';

export const ProfileTops = () => {
    return(
        <section className={styles['tops']}>
            <ProfileTop type="tracks" />
            <ProfileTop type="artists" />
            <ProfileTopGenres />
        </section>
    )
}