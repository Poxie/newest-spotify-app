import { HomeContact } from './HomeContact';
import { HomeMain } from './HomeMain';
import { HomeTiles } from './HomeTiles';

export default function Home() {
    return(
        <>
            <HomeMain />
            <HomeTiles />
            <HomeContact />
        </>
    )
}