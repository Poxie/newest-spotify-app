import { Album } from "@/types";
import { SET_TOP_LISTS } from "./constants";

export const setTopLists = (country: string, items: Album[]) => ({
    type: SET_TOP_LISTS,
    payload: { country, items }
})