import { ChatMetadata } from "@/constants/types";
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
  if (metaData.type === "group") {
    // Render group chat item
    chatTitle = metaData.title;
    chatAvatarUrl = metaData.avatarUrl;
  } else {
    // Render individual chat item
    const participant = metaData.participants?.find((p) => p.id !== user?.id);
    chatTitle = participant?.username || metaData.title;
    chatAvatarUrl = participant?.avatarUrl || metaData.avatarUrl;
  }
  
  return (
    <header className="bg-background w-full h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1 z-10">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <ChatAvatar avatarUrl={chatAvatarUrl} title={chatTitle} />
        <ChatInfo
          title={chatTitle}
          info={
            metaData.type === "group"
              ? `${metaData.participants.length} participants`
              : "last seen recently"
          }
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
