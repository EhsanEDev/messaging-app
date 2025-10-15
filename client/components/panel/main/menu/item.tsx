import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/shadcn/dropdown-menu";

interface IProps {
  icon: React.ElementType;
  title: string;
  postfix?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  stayOpen?: boolean;
}

const MainMenuItem: React.FC<IProps> = ({
  icon: Icon,
  title,
  postfix,
  onClick,
  disabled = false,
  stayOpen = false,
}) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer gap-4 py-2 px-5"
      onSelect={stayOpen ? (e) => e.preventDefault() : undefined }
    >
      <Icon className="size-5" />
      <span>{title}</span>
      {postfix && (
        <DropdownMenuShortcut className="">{postfix}</DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
};

export default MainMenuItem;
