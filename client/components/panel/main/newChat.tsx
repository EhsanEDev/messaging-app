import { DropdownMenuItem } from "@/components/shadcn/dropdown-menu";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import {
  LucideProps,
  MegaphoneIcon,
  User2Icon,
  Users2Icon,
} from "lucide-react";
import React from "react";

interface IProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<IProps> = ({ icon, label, onClick }) => {
  return (
    <>
      <DropdownMenuItem className="cursor-pointer" onClick={onClick}>
        {React.createElement(icon, { className: "mr-2 size-5" })}
        {label}
      </DropdownMenuItem>
    </>
  );
};

const NewChatMenuItems: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <MenuItem
        label="Direct"
        icon={User2Icon}
        onClick={() => dispatch(setPanelState("Direct"))}
      />

      <MenuItem
        label="Group"
        icon={Users2Icon}
        onClick={() => dispatch(setPanelState("Group"))}
      />

      <MenuItem
        label="Channel"
        icon={MegaphoneIcon}
        onClick={() => dispatch(setPanelState("Channel"))}
      />
    </>
  );
};

export default NewChatMenuItems;
