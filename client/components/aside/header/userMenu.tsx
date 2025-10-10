"use client";

import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu } from "../../ui/dropdown-menu";
import UserMenuContent from "./userMenuContent";
import UserMenuTrigger from "./userMenuTrigger";

const UserMenu: React.FC = () => {
  const { currentUser } = useAuth();

  const selectedUser = currentUser; // TEMP: simulate users
  return (
    <DropdownMenu>
      <UserMenuTrigger user={selectedUser} />
      <UserMenuContent />
    </DropdownMenu>
  );
};

export default UserMenu;
