import styles from '../../styles/Navbar.module.scss';
import Link from "next/link"
import { useRouter } from "next/router";

export const NavbarTab: React.FC<{
    path: string;
    text: string;
    activePaths?: string[];
}> = ({ text, path, activePaths }) => {
    const router = useRouter();

    const active = router.pathname === path || activePaths?.includes(router.pathname);
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