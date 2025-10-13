"use client";

import { useAppSelector } from "@/hooks/useStore";
import { MessageSquarePlusIcon } from "lucide-react";
import FloatButton from "../common/floatButton";
import Search from "../common/search";
import { SidebarTrigger } from "../shadcn/sidebar";
import ChatItem from "./main/chatItem";
import EmptyChatList from "./main/empty";
import NewChatMenuItems from "./main/newChat";
import Panel from "./panel";

const MainPanel: React.FC = () => {
  const chats = useAppSelector((state) => state.chat);
  return (
    <Panel
      header={{ btn: <SidebarTrigger />, input: <Search /> }}
      main={
        <FloatButton
          icon={MessageSquarePlusIcon}
          tooltip="New chat"
          menu={<NewChatMenuItems />}
        />
      }
      list={Object.values(chats)}
      renderItem={(item) => <ChatItem chat={item.meta} />}
      empty={<EmptyChatList />}
    />
  );
};

export default MainPanel;
