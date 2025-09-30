import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Bell, CreditCard, LogOut, Settings, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ItemProps {
  title: string;
  icon: typeof Bell;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ title, icon, onClick }) => {
  return (
    <DropdownMenuItem
      className="cursor-pointer flex items-center gap-4 py-2 text-sm"
      onClick={onClick}
    >
      <span className="text-muted-foreground">
        {React.createElement(icon, { className: "size-5" })}
      </span>
      <span>{title}</span>
    </DropdownMenuItem>
  );
};

interface IProps {}

const UserMenuContent: React.FC<IProps> = () => {
  const { isMobile } = useSidebar();
  const router = useRouter();
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
    <DropdownMenuContent
      className="min-w-44 w-fit"
      side={isMobile ? "bottom" : "right"}
      align={isMobile ? "end" : "start"}
    >
      <Item title="My Profile" icon={User2} onClick={handleX} />
      <Item title="Account Settings" icon={Settings} onClick={handleX} />
      <Item title="Billing" icon={CreditCard} onClick={handleX} />
      <Item title="Notifications" icon={Bell} onClick={handleX} />
      <DropdownMenuSeparator />
      <Item title="Sign out" icon={LogOut} onClick={handleSignOut} />
    </DropdownMenuContent>
  );
};

export default UserMenuContent;
