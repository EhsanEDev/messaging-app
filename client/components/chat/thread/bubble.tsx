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
      className={cn("relative flex items-end", {
        "flex-row-reverse self-end": isOwn,
        "flex-row self-start": !isOwn,
      })}
    >
      <Avatar className="size-9">
        <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <BubbleCorner isOwn={isOwn} />
      <article
        className={cn(
          " rounded-2xl p-2 pt-1 flex flex-col min-w-40 shadow-lg",
          {
            "rounded-br-none bg-green-50": isOwn,
            "rounded-bl-none bg-background": !isOwn,
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
