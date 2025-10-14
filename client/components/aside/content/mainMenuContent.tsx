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

const MainMenuContent: React.FC = () => {
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
  const handleSavedMessages = () => {
    //
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
        onClick={handleSavedMessages}
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
