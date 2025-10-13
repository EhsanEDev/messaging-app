import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { cn } from "@/lib/utils";
import { Chat, Message } from "@/shared/types";
import BubbleFooter from "./bubble/footer";
import BubbleHeader from "./bubble/header";
import BubbleCorner from "./corner";

interface IProps {
  isOwn: boolean;
  metaData: Chat;
  message: Message;
}

const MessageBubble: React.FC<IProps> = ({ message, isOwn, metaData }) => {
  return (
    <li
      // id={String(message.id)}
      className={cn("relative flex items-end", {
        "flex-row-reverse self-end": isOwn,
        "flex-row self-start": !isOwn,
      })}
    >
      <Avatar className={cn("size-9", { invisible: metaData.type === "Channel" })}>
        <AvatarImage
          src={message.sender.avatarUrl}
          alt={message.sender.username}
        />
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
          {message.sender.username.charAt(0).toUpperCase()}
        </AvatarFallback>
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
        <BubbleHeader chatType={metaData.type} message={message} />
        <p className="chat-text text-md">{message.content}</p>
        <BubbleFooter message={message} />
      </article>
    </li>
  );
};

export default MessageBubble;
