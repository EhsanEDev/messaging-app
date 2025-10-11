import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAppDispatch } from "@/hooks/useStore";
import { setPanelState } from "@/store/slices/uiSlice";
import { MessageSquareOffIcon } from "lucide-react";

const EmptyChatList: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Empty className="max-w-fit border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareOffIcon />
        </EmptyMedia>
        <EmptyTitle className="font-normal">No chats yet</EmptyTitle>
        <EmptyDescription>
          Click “Add Chat” to start chatting or invite a friend to join.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-row justify-center items-center gap-2">
        <Button onClick={() => dispatch(setPanelState("direct"))} className="cursor-pointer">Add chat</Button>
        <Button className="cursor-pointer" variant="secondary">
          Invite a friend
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyChatList;
