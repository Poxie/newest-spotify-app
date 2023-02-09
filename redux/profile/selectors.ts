import { RootState } from "../store";

export const selectProfileToken = (state: RootState) => state.profile.token;
export const selectProfileTokenLoading = (state: RootState) => state.profile.loading;