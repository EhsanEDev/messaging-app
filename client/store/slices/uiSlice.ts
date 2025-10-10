import { ChatType } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum AppStage {
  IDLE = "idle",
  AUTHENTICATING = "authenticating",
  DATA_LOADING = "data-loading",
  SOCKET_CONNECTING = "socket-connecting",
  READY = "ready",
}

type AppState =
  | "idle"
  | "authenticating"
  | "data-loading"
  | "socket-connecting"
  | "ready"
  | "error";

interface UiSliceType {
  theme: "light" | "dark";
  appState: {
    isInitializedSuccess: boolean;
    initState: AppState;
    error: string | null;
  };
  panelState: ChatType | "main";
}

const initialState: UiSliceType = {
  theme: "light",
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
      console.log("App state changed:", newState);

      state.appState.initState = newState;
      state.appState.isInitializedSuccess = newState === "ready";
    },
  },
});

export const { setPanelState, setAppState } = uiSlice.actions;
export default uiSlice.reducer;
