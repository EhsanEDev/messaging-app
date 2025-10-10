"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState, switchTheme } from "@/store/slices/uiSlice";
import {
  MegaphoneIcon,
  MoonIcon,
  PhoneIcon,
  SettingsIcon,
  UserRoundCheckIcon,
  Users2Icon,
} from "lucide-react";
import Item from "./mainMenuItem";

const MainMenuContent: React.FC = () => {
  const dispatch = useAppDispatch();
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
      <Item url="/settings" icon={MoonIcon} title="Night Mode" disabled />
    </SidebarMenu>
  );
};

export default MainMenuContent;
