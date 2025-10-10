import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

interface IProps {
  url?: string;
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MainMenuItem: React.FC<IProps> = ({
  url,
  icon: Icon,
  title,
  onClick,
  disabled = false,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={onClick} disabled={disabled} className="py-5 cursor-pointer">
        {url ? (
          <Link href={url} className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              <Icon className="size-5" />
            </span>
            <span>{title}</span>
          </Link>
        ) : (
          <>
            <span className="text-muted-foreground">
              <Icon className="size-5" />
            </span>
            <span>{title}</span>
          </>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MainMenuItem;
