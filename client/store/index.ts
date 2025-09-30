import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // chats: chatReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
