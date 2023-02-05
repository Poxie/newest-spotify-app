import { ExploreArtistsMain } from "./ExploreArtistsMain"
import { ExploreArtistsRelated } from "./ExploreArtistsRelated"
import { ExploreArtistsSelector } from "./ExploreArtistsSelector"
import { ExploreSubHeader } from "./ExploreSubHeader"

export const ExploreArtists = () => {
    return(
        <>
            <ExploreSubHeader 
                text="Enter your favorite artist and we will provide general information about the artist, as well as other artists you may like."
            />
            <ExploreArtistsSelector />
            <ExploreArtistsMain />
            <ExploreArtistsRelated />
        </>
    )
}