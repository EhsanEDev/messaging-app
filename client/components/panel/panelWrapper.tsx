"use client";

import CollectiveChatPanel from "@/components/panel/collectiveChatPanel";
import DirectChatPanel from "@/components/panel/directChatPanel";
import MainPanel from "@/components/panel/mainPanel";
import { useAppSelector } from "@/hooks/useStore";

const PanelWrapper: React.FC = () => {
  const panelState = useAppSelector((state) => state.ui.panelState);

  if (panelState === "direct") {
    return <DirectChatPanel />;
  } else if (panelState === "group" || panelState === "channel") {
    return <CollectiveChatPanel type={panelState} />;
  } else {
    return <MainPanel />;
  }
};

export default PanelWrapper;
