"use client";

import UserAvatar from "@/components/common/avatar";
import { useAuth } from "@/hooks/useAuth";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "../../ui/sidebar";

interface IProps {}

const UserSwitch: React.FC<IProps> = () => {
  const { user } = useAuth();
  const { isMobile } = useSidebar();
  const selectedUser = user; // TEMP: simulate users
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-full cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <UserAvatar
            src={user.avatarUrl}
            name={user.username}
            size="size-11"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-md font-medium">
              {user.username}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user.id + "@example.com"}
            </span>
          </div>
          <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-44 w-fit"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuItem>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar
                src={user.avatarUrl}
                name={user.username}
                size="size-6"
              />
              <span className="truncate">{user.username}</span>
            </div>
            {selectedUser.id === user.id && (
              <CheckIcon className="text-primary" />
            )}
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-border">
              <PlusIcon className="size-4" />
            </span>
            <span>Add Account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSwitch;
