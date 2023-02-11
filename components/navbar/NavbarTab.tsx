import styles from '../../styles/Navbar.module.scss';
import Link from "next/link"
import { useRouter } from "next/router";

export const NavbarTab: React.FC<{
    path: string;
    text: string;
}> = ({ text, path }) => {
    const router = useRouter();

    const active = router.pathname === path;
    return(
        <li>
            <Link 
                href={path}
                className={active ? styles['active'] : ''}
            >
                {text}
            </Link>
        </li>
    )
}