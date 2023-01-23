import { RootState } from "../store";

export const selectAuthToken = (state: RootState) => state.auth.generic.token;
export const selectAuthRefreshToken = (state: RootState) => state.auth.generic.refreshToken;