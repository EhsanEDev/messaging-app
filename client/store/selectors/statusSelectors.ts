import { RootState } from "..";

export const selectStatuses = (state: RootState) => state.user.contact;
