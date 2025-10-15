import { Button } from "@/components/shadcn/button";
import { Search } from "lucide-react";
import React from "react";

interface IProps {
  aria: string;
  icon: typeof Search;
  onClick?: () => void;
}

const CircleButton: React.FC<IProps> = ({ aria, icon, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="size-11 rounded-full cursor-pointer"
      aria-label={aria}
      onClick={onClick}
    >
      {React.createElement(icon, { className: "size-5 text-muted-foreground" })}
    </Button>
  );
};

export default CircleButton;
