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
  panelState: ChatType | "Main";
}

const initialState: UiSliceType = {
  appState: {
    isInitializedSuccess: false,
    initState: "idle",
    error: null,
  },
  panelState: "Main",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPanelState: (state, action: PayloadAction<ChatType | "Main">) => {
      state.panelState = action.payload;
    },
    setAppState: (state, action: PayloadAction<AppState>) => {
      if (state.appState.initState === "ready") {
        return;
      }
      const newState = action.payload;
      state.appState.initState = newState;
      state.appState.isInitializedSuccess = newState === "ready";
    },
  },
});

export const { setPanelState, setAppState } = uiSlice.actions;
export default uiSlice.reducer;
