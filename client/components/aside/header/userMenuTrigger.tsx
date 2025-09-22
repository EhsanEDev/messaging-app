import UserAvatar from "@/components/common/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { User } from "@/shared/types";
import { ChevronsUpDownIcon } from "lucide-react";

interface IProps {
  user: User;
}

const UserMenuTrigger: React.FC<IProps> = ({ user }) => {
  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton className="h-full cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <UserAvatar src={user.avatarUrl} name={user.username} size="size-11" />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate text-md font-medium">{user.username}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user.id + "@example.com"}
          </span>
        </div>
        <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
};

export default UserMenuTrigger;
