import Item from "@/components/common/dropDownItem";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import { MegaphoneIcon, User2Icon, Users2Icon } from "lucide-react";
import React from "react";

const NewChatMenuItems: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Item
        title="Direct"
        icon={User2Icon}
        onClick={() => dispatch(setPanelState("Direct"))}
      />

      <Item
        title="Group"
        icon={Users2Icon}
        onClick={() => dispatch(setPanelState("Group"))}
      />

      <Item
        title="Channel"
        icon={MegaphoneIcon}
        onClick={() => dispatch(setPanelState("Channel"))}
      />
    </>
  );
};

export default NewChatMenuItems;
