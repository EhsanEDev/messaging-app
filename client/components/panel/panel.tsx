import HeaderPanel from "./header";
import ChatListItem from "./item";

interface IProps {}

const ChatListPanel: React.FC<IProps> = () => {
  return (
    <>
      <HeaderPanel />
      {Array.from({ length: 6 }).map((_, index) => (
        <ChatListItem
          key={index}
          id={`chat-${index}`}
          avatarUrl={`https://i.pravatar.cc/150?img=${index}`}
          title={`Chat ${index}`}
          lastMessage={`Last message from chat ${index}`}
          date={new Date()}
          unreadCount={Math.floor(Math.random() * 100)}
          isOnline={Math.random() > 0.5}
          onClick={(id) => console.log(id)}
        />
      ))}
    </>
  );
};

export default ChatListPanel;
