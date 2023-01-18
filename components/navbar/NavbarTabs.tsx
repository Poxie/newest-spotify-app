import { NavbarTab } from "./NavbarTab"

const TABS = [
    { text: 'Top lists', path: 'top-lists' },
    { text: 'Explore', path: 'explore' },
    { text: 'Profile', path: 'profile' }
]
export const NavbarTabs = () => {
    return(
        <ul>
            {TABS.map(tab => (
                <NavbarTab 
                    {...tab}
                    key={tab.path}
                />
            ))}
        </ul>
    )
}