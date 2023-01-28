import { Track } from "@/types"

export type TopListsState = {
    countries: {
        [country: string]: Track[] | undefined;
    }
}