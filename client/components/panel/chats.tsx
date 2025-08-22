import { getChatList } from "@/lib/api";
import Search from "../common/search";
import { SidebarTrigger } from "../ui/sidebar";
import ChatItem from "./chats/chatItem";
import Panel from "./panel";
import { ChatMetadata } from "@/constants/types";
import { useEffect, useState, useTransition } from "react";

interface IProps {}

const ChatsPanel: React.FC<IProps> = () => {
  const [isPending, startTransition] = useTransition();
  const [chatList, setChatList] = useState<ChatMetadata[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const chatList = await getChatList();
      setChatList(chatList);
    });
  }, []);
  return (
    <Panel
      header={{ btn: <SidebarTrigger />, input: <Search /> }}
      loading={isPending}
      list={chatList}
      renderItem={(item) => <ChatItem chat={item} />}
      emptyMessage="No chats available"
    />
  );
};

export default ChatsPanel;
