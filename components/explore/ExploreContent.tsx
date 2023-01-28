import { useRouter } from "next/router"
import { ExploreArtists } from "./ExploreArtists";
import { ExploreSongs } from "./ExploreSongs";

export const ExploreContent = () => {
    const { tab='songs' } = useRouter().query as { tab?: 'songs' | 'artists' };
    switch(tab) {
        case 'artists':
            return <ExploreArtists />
        default:
            return <ExploreSongs />
    }
}