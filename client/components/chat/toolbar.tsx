import MoreActions from "./toolbar/actions";
import ChatAvatar from "./toolbar/avatar";
import Call from "./toolbar/call";
import ChatInfo from "./toolbar/info";
import SearchInChat from "./toolbar/search";

interface IProps {
  chatId: string;
  avatarUrl?: string;
  title: string;
  info: string;
}

const ChatToolbar: React.FC<IProps> = ({ chatId, avatarUrl, title, info }) => {
  return (
    <header className="bg-background h-16 px-5 flex items-center justify-between gap-4 border-b-border border-b-1">
      {/* Left section */}
      <section className="flex items-center gap-3 flex-1 cursor-pointer">
        <ChatAvatar avatarUrl={avatarUrl} title={title} />
        <ChatInfo title={title} info={info} />
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
