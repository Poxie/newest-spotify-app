import { RootState } from "../store";

export const selectProfileToken = (state: RootState) => state.profile.token;