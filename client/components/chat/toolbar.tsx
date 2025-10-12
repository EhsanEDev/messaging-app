import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useStore";
import { formatStatus } from "@/lib/user-status";
import { Chat } from "@/shared/types";
import Avatar from "../common/avatar";
import MoreActions from "./toolbar/actions";
import Call from "./toolbar/call";
import ChatInfo from "./toolbar/info";
import SearchInChat from "./toolbar/search";

interface IProps {
  metaData: Chat;
}

const ChatToolbar: React.FC<IProps> = ({ metaData }) => {
  const { currentUser } = useAuth();
  const contacts = useAppSelector((state) => state.user.contact);
  const typingMembers = useAppSelector((state) => state.chat)[metaData.id]
    .status.typing;

  let chatTitle;
  let chatAvatarUrl;
  let chatInfo;
  if (metaData.type === "group") {
    chatTitle = metaData.title;
    chatAvatarUrl = metaData.avatarUrl;
    chatInfo = `${metaData.members.length} members`;
  } else {
    const member = metaData.members?.find(
      (p) => p.id !== currentUser.id
    );
    if (!member) return;
    chatTitle = member.username;
    chatAvatarUrl = member.avatarUrl;
    chatInfo = "last seen recently";
    chatInfo = formatStatus(contacts[member.id]?.status);
  }

  // Update chatInfo if someone is typing
  if (typingMembers.length > 0) {
    if (typingMembers.length === 1) {
      chatInfo = `is typing...`;
    } else {
      chatInfo = `${typingMembers.join(", ")} are typing...`;
    }
  }

  return (
    <header className="bg-background w-full h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1 z-10">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <Avatar src={chatAvatarUrl} title={chatTitle} size="size-11" />
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
