"use client";

import { SidebarMenu } from "@/components/shadcn/sidebar";
import { Switch } from "@/components/shadcn/switch";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import {
  BookmarkIcon,
  MegaphoneIcon,
  MoonIcon,
  PhoneIcon,
  SettingsIcon,
  User2Icon,
  Users2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Item from "./mainMenuItem";
import { Chat, ChatCreate } from "@/shared/types";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

const MainMenuContent: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  const handleSwitchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const handleNewChannel = () => {
    dispatch(setPanelState("Channel"));
  };
  const handleNewGroup = () => {
    dispatch(setPanelState("Group"));
  };
  const handleNewDirect = () => {
    dispatch(setPanelState("Direct"));
  };
  const handleSavedMessages = async (chat: ChatCreate) => {
    // Create/Open chat by id
    try {
      const res = await fetcher<Chat>("/api/chat/create", {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push(`/chat/${res.data.id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  return (
    <SidebarMenu>
      <Item
        icon={MegaphoneIcon}
        title="New Channel"
        onClick={handleNewChannel}
      />
      <Item icon={Users2Icon} title="New Group" onClick={handleNewGroup} />
      <Item icon={User2Icon} title="New Direct" onClick={handleNewDirect} />
      <Item
        icon={BookmarkIcon}
        title="Saved Messages"
        onClick={() => handleSavedMessages({type: "Direct", membersId: []})}
      />
      <Item icon={PhoneIcon} title="Calls" />
      <Item icon={SettingsIcon} title="Settings" disabled />
      <Item
        icon={MoonIcon}
        title="Night Mode"
        onClick={handleSwitchTheme}
        postfix={<Switch checked={theme === "dark"} />}
      />
    </SidebarMenu>
  );
};

export default MainMenuContent;
