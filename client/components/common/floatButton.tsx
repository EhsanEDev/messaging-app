import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { ForwardIcon, LucideProps } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../shadcn/tooltip";

interface IProps {
  className?: string;
  tooltip?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  onClick?: () => void;
}

const FloatButton: React.FC<IProps> = ({
  type,
  onClick,
  className,
  icon,
  tooltip,
}) => {
  const button = () => (
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
    return (
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>{button()}</TooltipTrigger>
        <TooltipContent>{<p>{tooltip}</p>}</TooltipContent>
      </Tooltip>
    );
  }

  return button();
};

export default FloatButton;
