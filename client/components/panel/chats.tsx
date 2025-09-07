import { ChatMetadata } from "@/shared/types";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState, useTransition } from "react";
import Search from "../common/search";
import { SidebarTrigger } from "../ui/sidebar";
import ChatItem from "./chats/chatItem";
import Panel from "./panel";

interface IProps {}

const ChatsPanel: React.FC<IProps> = () => {
  const [isPending, startTransition] = useTransition();
  const [chatList, setChatList] = useState<ChatMetadata[]>([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetcher<ChatMetadata[]>("/api/chat/list");
        setChatList(res.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    });
  }, []);
  // console.log(chatList);

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
