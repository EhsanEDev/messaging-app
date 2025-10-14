import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar";

interface IProps {
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  postfix?: React.ReactNode;
}

const MainMenuItem: React.FC<IProps> = ({
  icon: Icon,
  title,
  onClick,
  disabled = false,
  postfix,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={onClick}
        disabled={disabled}
        className="py-5 cursor-pointer gap-4"
      >
        <span className="text-muted-foreground">
          <Icon className="size-5" />
        </span>
        <span>{title}</span>
      </SidebarMenuButton>
      {postfix && (
        <SidebarMenuBadge className="py-3.5">{postfix}</SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
};

export default MainMenuItem;
