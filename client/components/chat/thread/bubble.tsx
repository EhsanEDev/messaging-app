import { Message } from "@/constants/types";
import { cn } from "@/lib/utils";
import BubbleFooter from "./bubble/footer";
import BubbleHeader from "./bubble/header";
import BubbleCorner from "./corner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps {
  isOwn: boolean;
  message: Message;
}

const MessageBubble: React.FC<IProps> = ({ message, isOwn }) => {
  return (
    <li
      className={cn("flex items-end", {
        "flex-row-reverse self-end": isOwn,
        "flex-row self-start": !isOwn,
      })}
    >
      <Avatar className="size-8">
        <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <BubbleCorner isOwn={isOwn} />
      <article
        className={cn(
          "relative bg-background rounded-2xl px-4 py-0 flex flex-col",
          {
            "rounded-br-none": isOwn,
            "rounded-bl-none": !isOwn,
          }
        )}
      >
        <BubbleHeader message={message} />
        <p className="chat-text text-md">{message.content}</p>
        <BubbleFooter message={message} />
      </article>
    </li>
  );
};

export default MessageBubble;
