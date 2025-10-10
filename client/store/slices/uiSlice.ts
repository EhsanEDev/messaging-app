import { ChatType } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState =
  | "idle"
  | "authenticating"
  | "data-loading"
  | "socket-connecting"
  | "ready"
  | "error";

interface UiSliceType {
  appState: {
    isInitializedSuccess: boolean;
    initState: AppState;
    error: string | null;
  };
  panelState: ChatType | "main";
}

const initialState: UiSliceType = {
  appState: {
    isInitializedSuccess: false,
    initState: "idle",
    error: null,
  },
  panelState: "main",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPanelState: (state, action: PayloadAction<ChatType | "main">) => {
      state.panelState = action.payload;
    },
    setAppState: (state, action: PayloadAction<AppState>) => {
      const newState = action.payload;
      state.appState.initState = newState;
      state.appState.isInitializedSuccess = newState === "ready";
    },
  },
});

export const { setPanelState, setAppState } = uiSlice.actions;
export default uiSlice.reducer;
