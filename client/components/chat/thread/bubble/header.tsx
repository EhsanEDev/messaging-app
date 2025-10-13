import { ChatType, Message } from "@/shared/types";

interface IProps {
  chatType: ChatType;
  message: Message;
}

const BubbleHeader: React.FC<IProps> = ({ message, chatType }) => {
  return (
    <header className="flex justify-between">
      <h2 className="chat-sender text-sm font-bold text-blue-500">
        {chatType === "Channel" ? message.sender.role : message.sender.username}
      </h2>
      <time className="text-xs text-muted-foreground">
        {new Date(message.createdAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </time>
    </header>
  );
};

export default BubbleHeader;
