import { Message } from "@/constants/types";
import { cn } from "@/lib/utils";

interface IProps {
  isOwn: boolean;
  message: Message;
}

const MessageBubble: React.FC<IProps> = ({ message, isOwn }) => {
  return (
    <li
      className={cn("bg-background rounded-2xl p-4", {
        "self-end": isOwn,
        "self-start": !isOwn,
      })}
    >
      <span className="chat-sender">{message.senderId}:</span>
      <span className="chat-text">{message.content}</span>
    </li>
  );
};

export default MessageBubble;
