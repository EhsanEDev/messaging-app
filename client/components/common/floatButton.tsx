import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";

interface IProps {
  className?: string;
  tooltip?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
  menu?: React.ReactNode;
}

const FloatButton: React.FC<IProps> = ({
  type,
  onClick,
  className,
  icon,
  tooltip,
  menu,
}) => {
  let final: React.ReactNode = (
    <Button
      type={type}
      className={cn(
        "absolute bottom-5 right-5 size-12 rounded-full cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {React.createElement(icon, { className: "size-6" })}
    </Button>
  );

  if (tooltip) {
    final = (
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>{final}</TooltipTrigger>
        <TooltipContent>{<p>{tooltip}</p>}</TooltipContent>
      </Tooltip>
    );
  }

  if (menu) {
    final = (
      <div className="absolute bottom-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>{final}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute bottom-20 right-5">
            <DropdownMenuGroup>{menu}</DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return final;
};

export default FloatButton;
