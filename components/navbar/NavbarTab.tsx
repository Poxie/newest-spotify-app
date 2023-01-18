import Link from "next/link"

export const NavbarTab: React.FC<{
    path: string;
    text: string;
}> = ({ text, path }) => {
    return(
        <li>
            <Link href={path}>
                {text}
            </Link>
        </li>
    )
}