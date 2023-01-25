import { Album } from "@/types"

export type TopListsState = {
    countries: {
        [country: string]: Album[];
    }
}