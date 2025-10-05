import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
// import statusReducer from "./slices/statusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    // ui: statusReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
