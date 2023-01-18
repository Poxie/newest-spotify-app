import styles from '../../styles/Navbar.module.scss';
import { SiteIcon } from "@/assets/icons/SiteIcon";

export default function Navbar() {
    return(
        <header>
            <nav>
                <div className={styles['header-name']}>
                    <SiteIcon />
                    <span>
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                    </span>
                </div>
            </nav>
        </header>
    )
}