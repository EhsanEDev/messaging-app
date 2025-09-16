import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { asideAppItems, asideProfileItems } from "@/constants/menuList";

interface IProps {}

const AsideContent: React.FC<IProps> = () => {
  return (
    <SidebarContent className="px-4">
      <SidebarGroup />
      <SidebarGroupLabel>Profile</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {asideProfileItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarGroup />
      <SidebarGroup />
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {asideAppItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarGroup />
    </SidebarContent>
  );
};

export default AsideContent;
