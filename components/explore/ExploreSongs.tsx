import { ExploreSongsResults } from "./ExploreSongsResults"
import { ExploreSongsSelectors } from "./ExploreSongsSelectors"
import { ExploreSubHeader } from "./ExploreSubHeader"

export const ExploreSongs = () => {
    return(
        <>
        <ExploreSubHeader 
            text="Get songs related to a particular song and artist. We will suggest songs you may like based of your input."
        />
        <ExploreSongsSelectors />
        <ExploreSongsResults />
        </>
    )
}