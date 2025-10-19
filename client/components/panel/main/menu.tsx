import CircleButton from "@/components/common/circleButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { MenuIcon } from "lucide-react";
import React from "react";
import MenuContent from "./menu/content";
import MenuHeader from "./menu/header";

const Menu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <CircleButton aria="Drop down menu" icon={MenuIcon} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="">
        <MenuHeader />
        <DropdownMenuSeparator />
        <MenuContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
