"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
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
import { Switch } from "@/components/ui/switch";

const MainMenuContent: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const handleSwitchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <SidebarMenu>
      <Item url="/" icon={Users2Icon} title="New Group" disabled />
      <Item url="/about" icon={MegaphoneIcon} title="New Channel" disabled />
      <Item
        icon={UserRoundCheckIcon}
        title="Contacts"
        onClick={() => dispatch(setPanelState("direct"))}
      />
      <Item url="/calls" icon={PhoneIcon} title="Calls" disabled />
      <Item url="/settings" icon={SettingsIcon} title="Settings" disabled />
      <Item icon={MoonIcon} title="Night Mode" onClick={handleSwitchTheme} postfix={<Switch checked={theme === "dark"} />} />
    </SidebarMenu>
  );
};

export default MainMenuContent;
