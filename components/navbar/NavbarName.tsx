import styles from '../../styles/Navbar.module.scss';
import { SiteIcon } from "@/assets/icons/SiteIcon"
import Link from "next/link"

export const NavbarName = () => {
    return(
        <Link 
            className={styles['header-name']}
            href={'/'}
        >
            <>
            <SiteIcon />
            <span>
                {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </span>
            </>
        </Link>
    )
}