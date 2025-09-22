"use client";

import { useSocket } from "@/hooks/useSocket";
import { fetcher } from "@/lib/fetcher";
import { ChatMetadata } from "@/shared/types";
import { useEffect, useTransition } from "react";
import Search from "../common/search";
import { SidebarTrigger } from "../ui/sidebar";
import ChatItem from "./chats/chatItem";
import Panel from "./panel";

const MainPanel: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const { chats, setChats } = useSocket();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetcher<ChatMetadata[]>("/api/chat/list");
        setChats(
          Object.fromEntries(
            res.data.map((chat: ChatMetadata) => [chat.id, chat])
          )
        );
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
      list={Object.values(chats)}
      renderItem={(item) => <ChatItem chat={item} />}
      emptyMessage="No chats available"
    />
  );
};

export default MainPanel;
