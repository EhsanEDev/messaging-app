import { getChatList } from "@/lib/api";
import HeaderPanel from "./header";
import ChatListItem from "./item";

interface IProps {}

const ChatListPanel: React.FC<IProps> = () => {
  const chatList = getChatList();
  return (
    <>
      <HeaderPanel />
      <ul className="p-2">
        {chatList.map((chat, index) => (
          <li key={index}>
            <ChatListItem
              chat={chat}
              onClick={(id) => console.log(id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatListPanel;
