import HeaderPanel from "./header";
import ChatListItem from "./item";

interface IProps {}

const ChatListPanel: React.FC<IProps> = () => {
  return (
    <>
      <HeaderPanel />
      <ul className="p-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <ChatListItem
              id={`chat-${index}`}
              avatarUrl={`https://i.pravatar.cc/150?img=${index}`}
              title={`Chat ${index}`}
              lastMessage={`Last message from chat ${index}`}
              date={new Date()}
              unreadCount={Math.floor(Math.random() * 100)}
              isOnline={Math.random() > 0.5}
              onClick={(id) => console.log(id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatListPanel;
