import MoreActions from "./header/actions";
import ChatAvatar from "./header/avatar";
import Call from "./header/call";
import ChatInfo from "./header/info";
import SearchInChat from "./header/search";

interface IProps {
  chatId: string;
  avatarUrl?: string;
  title: string;
  membersCount: string;
}

const ChatHeader: React.FC<IProps> = ({
  chatId,
  avatarUrl,
  title,
  membersCount,
}) => {
  return (
    <header className="bg-background h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <ChatAvatar avatarUrl={avatarUrl} title={title} />
        <ChatInfo title={title} info={membersCount} />
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

export default ChatHeader;
