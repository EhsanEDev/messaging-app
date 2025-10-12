"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import { PencilIcon } from "lucide-react";
import FloatButton from "../common/floatButton";
import Search from "../common/search";
import { SidebarTrigger } from "../shadcn/sidebar";
import ChatItem from "./chats/chatItem";
import EmptyChatList from "./chats/empty";
import Panel from "./panel";

const MainPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chat);
  return (
    <Panel
      header={{ btn: <SidebarTrigger />, input: <Search /> }}
      main={
        <FloatButton
          icon={PencilIcon}
          tooltip="New chat"
          onClick={() => dispatch(setPanelState("direct"))}
        />
      }
      list={Object.values(chats)}
      renderItem={(item) => <ChatItem chat={item.meta} />}
      empty={<EmptyChatList />}
    />
  );
};

export default MainPanel;
