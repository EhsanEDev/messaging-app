import { useChatData } from "@/hooks/useChatData";
import { Chat } from "@/shared/types";
import { BookmarkIcon } from "lucide-react";
import Avatar from "../common/avatar";
import MoreActions from "./toolbar/actions";
import Call from "./toolbar/call";
import ChatInfo from "./toolbar/info";
import SearchInChat from "./toolbar/search";

interface IProps {
  metaData: Chat;
}

const ChatToolbar: React.FC<IProps> = ({ metaData }) => {
  const { chatTitle, chatAvatarUrl, chatInfo } = useChatData({
    mode: "header",
    chat: metaData,
  });

  return (
    <header className="bg-background w-full h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1 z-10">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <Avatar
          src={chatAvatarUrl}
          title={chatTitle}
          icon={metaData.members.length < 2 ? BookmarkIcon : undefined}
          size="size-11"
        />
        <ChatInfo title={chatTitle} info={chatInfo} />
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
