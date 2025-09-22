"use client";

import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu } from "../../ui/dropdown-menu";
import UserMenuContent from "./userMenuContent";
import UserMenuTrigger from "./userMenuTrigger";

interface IProps {}

const UserMenu: React.FC<IProps> = () => {
  const { user } = useAuth();

  const selectedUser = user; // TEMP: simulate users
  return (
    <DropdownMenu>
      <UserMenuTrigger user={selectedUser} />
      <UserMenuContent />
    </DropdownMenu>
  );
};

export default UserMenu;
