import { SidebarMenu } from "@/components/ui/sidebar";
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
  return (
    <SidebarMenu>
      <Item url="/" icon={Users2Icon} title="New Group" />
      <Item url="/about" icon={MegaphoneIcon} title="New Channel" />
      <Item url="/contact" icon={UserRoundCheckIcon} title="Contacts" />
      <Item url="/calls" icon={PhoneIcon} title="Calls" />
      <Item url="/settings" icon={SettingsIcon} title="Settings" />
      <Item url="/settings" icon={MoonIcon} title="Night Mode" />
    </SidebarMenu>
  );
};

export default MainMenuContent;
