import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/shadcn/dropdown-menu";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface IProps {
  icon: React.ElementType;
  title: string;
  postfix?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  stayOpen?: boolean;
  className?: ClassNameValue;
}

const DropDownItem: React.FC<IProps> = ({
  icon: Icon,
  title,
  postfix,
  onClick,
  disabled = false,
  stayOpen = false,
  className,
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      disabled={disabled}
      className={cn("cursor-pointer gap-4 py-2.5", className)}
      onSelect={stayOpen ? (e) => e.preventDefault() : undefined}
    >
      <Icon className="size-5" />
      <span>{title}</span>
      {postfix && (
        <DropdownMenuShortcut className="">{postfix}</DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
};

export default DropDownItem;
