import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import React, { Fragment } from "react";
import MenuContent from "./menu/content";
import MenuHeader from "./menu/header";
import CircleButton from "@/components/common/circleButton";
import { MenuIcon } from "lucide-react";

interface IProps {}

const Menu: React.FC<IProps> = () => {
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
