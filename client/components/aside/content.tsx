import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { asideAppItems } from "@/constants/menuList";
import Link from "next/link";
import MainMenu from "./content/mainMenu";

interface IProps {}

const AsideContent: React.FC<IProps> = () => {
  return (
    <SidebarContent className="px-4">
      <MainMenu />
    </SidebarContent>
  );
};

export default AsideContent;
