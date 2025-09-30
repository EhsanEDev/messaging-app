import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

interface IProps {
  url: string;
  icon: React.ElementType;
  title: string;
}

const MainMenuItem: React.FC<IProps> = ({ url, icon: Icon, title }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="py-5" asChild>
        <Link href={url} className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            <Icon className="size-5" />
          </span>
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MainMenuItem;
