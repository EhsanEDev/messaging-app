import UserAvatar from "@/components/common/avatar";
import {
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Bell, CreditCard, LogOut, Settings, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Item from "./item";

interface IProps {}

const MenuHeader: React.FC<IProps> = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { signout } = useAuth();

  const handleSignOut = async () => {
    try {
      await signout();
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleX = () => {
    // Handle sign out logic
  };
  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer gap-3">
          <UserAvatar
            src={currentUser.avatarUrl}
            title={currentUser.username}
            size="size-11"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-md font-medium">
              {currentUser.username}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {currentUser.id + "@example.com"}
            </span>
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <Item title="My Profile" icon={User2} onClick={handleX} disabled />
            <Item
              title="Account Settings"
              icon={Settings}
              onClick={handleX}
              disabled
            />
            <Item
              title="Billing"
              icon={CreditCard}
              onClick={handleX}
              disabled
            />
            <Item
              title="Notifications"
              icon={Bell}
              onClick={handleX}
              disabled
            />
            <DropdownMenuSeparator />
            <Item title="Sign out" icon={LogOut} onClick={handleSignOut} />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
};

export default MenuHeader;
