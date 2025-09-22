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

interface IProps {}

const AsideContent: React.FC<IProps> = () => {
  return (
    <SidebarContent className="px-4">
      <SidebarGroup>
        {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
        <SidebarGroupContent>
          <SidebarMenu>
            {asideAppItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="py-5" asChild>
                  <Link
                    href={item.url}
                    className="flex items-center gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">
                      <item.icon className="size-5" />
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AsideContent;
