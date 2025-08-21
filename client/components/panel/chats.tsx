import { getChatList } from "@/lib/api";
import Search from "../common/search";
import { SidebarTrigger } from "../ui/sidebar";
import ChatListItem from "./chats/item";
import Panel from "./panel";

interface IProps {}

const ChatsPanel: React.FC<IProps> = () => {
  const chatList = getChatList();
  return (
    <Panel
      header={{ btn: <SidebarTrigger />, input: <Search /> }}
      list={chatList}
      renderItem={(item) => <ChatListItem chat={item} />}
      emptyMessage="No chats available"
    />
  );
};

export default ChatsPanel;
