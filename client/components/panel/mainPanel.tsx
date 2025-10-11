"use client";

import { useAppSelector } from "@/hooks/useStore";
import Search from "../common/search";
import { SidebarTrigger } from "../ui/sidebar";
import ChatItem from "./chats/chatItem";
import EmptyChatList from "./chats/empty";
import Panel from "./panel";

const MainPanel: React.FC = () => {
  const chats = useAppSelector((state) => state.chat);
  return (
    <Panel
      header={{ btn: <SidebarTrigger />, input: <Search /> }}
      list={Object.values(chats)}
      renderItem={(item) => <ChatItem chat={item.meta} />}
      empty={<EmptyChatList />}
    />
  );
};

export default MainPanel;
