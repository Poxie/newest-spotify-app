import styles from '../../styles/Profile.module.scss';
import { ProfileTop } from "./ProfileTop";

export const ProfileTops = () => {
    return(
        <section className={styles['tops']}>
            <ProfileTop type="artists" />
            <ProfileTop type="tracks" />
        </section>
    )
}