import { ChatType } from "@/shared/types";

interface IProps {
  type: Omit<ChatType, "direct">;
  onBack: () => void;
}

const CollectiveChatPanel: React.FC<IProps> = ({ onBack, type }) => {
  return (
    <>
      <h2>Group/Channel Chats</h2>
    </>
  );
};

export default CollectiveChatPanel;
