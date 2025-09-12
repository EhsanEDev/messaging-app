import MainPanel from "@/components/panel/mainPanel";
import NewChatButton from "@/components/panel/chats/newChatButton";
import DirectChatPanel from "@/components/panel/directChatPanel";
import CollectiveChatPanel from "@/components/panel/collectiveChatPanel";
import { ChatType } from "@/shared/types";
import { useState } from "react";

const PanelWrapper: React.FC = () => {
  const [panelState, setPanelState] = useState<ChatType | "main">("main");

  if (panelState === "direct") {
    return <DirectChatPanel onBack={() => setPanelState("main")} />;
  } else if (panelState === "group" || panelState === "channel") {
    return <CollectiveChatPanel type={panelState} onBack={() => setPanelState("main")} />;
  } else {
    return (
      <>
        <MainPanel />
        <NewChatButton onClick={() => setPanelState("direct")} />
      </>
    );
  }
};

export default PanelWrapper;
