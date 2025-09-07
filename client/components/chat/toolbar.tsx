import { ChatMetadata } from "@/shared/types";
import MoreActions from "./toolbar/actions";
import ChatAvatar from "./toolbar/avatar";
import Call from "./toolbar/call";
import ChatInfo from "./toolbar/info";
import SearchInChat from "./toolbar/search";
import { useAuth } from "@/hooks/useAuth";

interface IProps {
  chatId: string;
  metaData: ChatMetadata;
}

const ChatToolbar: React.FC<IProps> = ({ chatId, metaData }) => {
  const { user } = useAuth();

  let chatTitle;
  let chatAvatarUrl;
  let chatInfo;
  if (metaData.type === "group") {
    chatTitle = metaData.title;
    chatAvatarUrl = metaData.avatarUrl;
    chatInfo = `${metaData.participants.length} participants`;
  } else {
    const participant = metaData.participants?.find((p) => p.id !== user?.id);
    if (!participant) return;
    chatTitle = participant.username;
    chatAvatarUrl = participant.avatarUrl;
    chatInfo = "last seen recently";
  }
  
  return (
    <header className="bg-background w-full h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1 z-10">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <ChatAvatar avatarUrl={chatAvatarUrl} title={chatTitle} />
        <ChatInfo
          title={chatTitle}
          info={chatInfo}
        />
      </section>

      {/* Right section */}
      <section className="flex justify-between items-center gap-1">
        <SearchInChat />
        <Call />
        <MoreActions />
      </section>
    </header>
  );
};

export default ChatToolbar;
