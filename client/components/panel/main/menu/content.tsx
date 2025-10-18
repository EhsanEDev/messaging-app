"use client";

import { DropdownMenuGroup } from "@/components/shadcn/dropdown-menu";
import { Switch } from "@/components/shadcn/switch";
import { useAppDispatch } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, ChatCreate } from "@/shared/types";
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
import { useRouter } from "next/navigation";
import Item from "../../../common/dropDownItem";

const MenuContent: React.FC = () => {
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
    <>
      <DropdownMenuGroup className="min-w-64">
        <Item
          className="px-4"
          icon={MegaphoneIcon}
          title="New Channel"
          onClick={handleNewChannel}
        />
        <Item
          className="px-4"
          icon={Users2Icon}
          title="New Group"
          onClick={handleNewGroup}
        />
        <Item
          className="px-4"
          icon={User2Icon}
          title="New Direct"
          onClick={handleNewDirect}
        />
        <Item
          className="px-4"
          icon={BookmarkIcon}
          title="Saved Messages"
          onClick={() => handleSavedMessages({ type: "Direct", membersId: [] })}
        />
        <Item className="px-4" icon={PhoneIcon} title="Calls" disabled />
        <Item className="px-4" icon={SettingsIcon} title="Settings" disabled />
        <Item
          className="px-4"
          icon={MoonIcon}
          title="Night Mode"
          onClick={handleSwitchTheme}
          postfix={<Switch checked={theme === "dark"} />}
          stayOpen
        />
      </DropdownMenuGroup>
    </>
  );
};

export default MenuContent;
