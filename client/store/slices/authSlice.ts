import { User } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | User;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
    },
    cleanUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, cleanUser } = authSlice.actions;
export default authSlice.reducer;