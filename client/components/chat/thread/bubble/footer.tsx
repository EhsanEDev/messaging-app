import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { Badge } from "@/components/shadcn/badge";
import { Message } from "@/shared/types";

interface IProps {
  message: Message;
}

const BubbleFooter: React.FC<IProps> = ({ message }) => {
  return (
    <footer className="flex flex-row-reverse justify-between gap-2 items-baseline-last">
      {/* <div className="flex gap-2"> */}
        {/* <time className="text-xs text-muted-foreground">
          {new Date(message.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </time> */}
        {/* <span className="text-xs text-muted-foreground">//</span> */}
      {/* </div> */}
      {message.reactedBy?.length ? (
        <Badge variant="default" className="text-lg rounded-full px-1 py-0">
          {message.reactedBy.map((user) => user.emoji).join(", ")}
          <Avatar className="size-6">
            <AvatarImage
              src={message.sender.avatarUrl}
              alt={message.sender.username}
            />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {message.sender.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Badge>
      ) : null}
    </footer>
  );
};

export default BubbleFooter;
