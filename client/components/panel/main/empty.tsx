import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shadcn/empty";
import { MessageSquareOffIcon } from "lucide-react";

const EmptyChatList: React.FC = () => {
  // const dispatch = useAppDispatch();
  return (
    <Empty className="max-w-fit">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareOffIcon />
        </EmptyMedia>
        <EmptyTitle className="font-normal text-md">No chats yet</EmptyTitle>
        <EmptyDescription className="text-sm">
          Click “New chat” to start chatting or invite a friend to join.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent className="flex flex-row justify-center items-center gap-2">
        <Button onClick={() => dispatch(setPanelState("Direct"))} className="cursor-pointer">Add chat</Button>
        <Button className="cursor-pointer" variant="secondary">
          Invite a friend
        </Button>
      </EmptyContent> */}
    </Empty>
  );
};

export default EmptyChatList;
