"use client";

import { SidebarMenu } from "@/components/shadcn/sidebar";
import { Switch } from "@/components/shadcn/switch";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import {
  MegaphoneIcon,
  MoonIcon,
  PhoneIcon,
  SettingsIcon,
  UserRoundCheckIcon,
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
  const handleNewGroup = () => {
    dispatch(setPanelState("Group"));
  };
  return (
    <SidebarMenu>
      <Item icon={Users2Icon} title="New Group" onClick={handleNewGroup} />
      <Item url="/about" icon={MegaphoneIcon} title="New Channel" disabled />
      <Item
        icon={UserRoundCheckIcon}
        title="Contacts"
        onClick={() => dispatch(setPanelState("Direct"))}
      />
      <Item url="/calls" icon={PhoneIcon} title="Calls" disabled />
      <Item url="/settings" icon={SettingsIcon} title="Settings" disabled />
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
