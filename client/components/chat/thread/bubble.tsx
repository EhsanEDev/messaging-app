import { Message } from "@/shared/types";
import { cn } from "@/lib/utils";
import BubbleFooter from "./bubble/footer";
import BubbleHeader from "./bubble/header";
import BubbleCorner from "./corner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";

interface IProps {
  isOwn: boolean;
  message: Message;
}

const MessageBubble: React.FC<IProps> = ({ message, isOwn }) => {
  return (
    <li
      // id={String(message.id)}
      className={cn("relative flex items-end", {
        "flex-row-reverse self-end": isOwn,
        "flex-row self-start": !isOwn,
      })}
    >
      <Avatar className="size-9">
        <AvatarImage src={message.sender.avatarUrl} alt={message.sender.username} />
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">{message.sender.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <BubbleCorner isOwn={isOwn} />
      <article
        className={cn(
          " rounded-2xl p-2 pt-1 flex flex-col min-w-40 shadow-lg",
          {
            "rounded-br-none bg-card": isOwn, // @TODO background color secondary
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
