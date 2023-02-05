import { ExploreSongsHeader } from "./ExploreSongsHeader"
import { ExploreSongsResults } from "./ExploreSongsResults"
import { ExploreSongsSelectors } from "./ExploreSongsSelectors"

export const ExploreSongs = () => {
    return(
        <>
        <ExploreSongsHeader />
        <ExploreSongsSelectors />
        <ExploreSongsResults />
        </>
    )
}