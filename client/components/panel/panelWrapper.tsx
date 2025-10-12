"use client";

import NewChatButton from "@/components/panel/chats/newChatButton";
import CollectiveChatPanel from "@/components/panel/collectiveChatPanel";
import DirectChatPanel from "@/components/panel/directChatPanel";
import MainPanel from "@/components/panel/mainPanel";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";

const PanelWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const panelState = useAppSelector((state) => state.ui.panelState);

  if (panelState === "direct") {
    return <DirectChatPanel onBack={() => dispatch(setPanelState("main"))} />;
  } else if (panelState === "group" || panelState === "channel") {
    return (
      <CollectiveChatPanel
        type={panelState}
        onBack={() => dispatch(setPanelState("main"))}
      />
    );
  } else {
    return (
      <>
        <MainPanel />
        <NewChatButton onClick={() => dispatch(setPanelState("direct"))} />
      </>
    );
  }
};

export default PanelWrapper;
