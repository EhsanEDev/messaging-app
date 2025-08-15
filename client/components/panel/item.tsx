import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface IProps {
  id: string; // unique chat ID for keys or navigation
  avatarUrl: string; // URL of chat avatar image
  title: string; // chat name or group name
  lastMessage: string; // summary of last message
  date: string | Date; // last message timestamp
  unreadCount?: number; // optional unread messages count
  isOnline?: boolean; // optional online status
  onClick?: (id: string) => void; // handler when item clicked
}

const ChatListItem: React.FC<IProps> = ({
  id,
  avatarUrl,
  title,
  lastMessage,
  date,
  unreadCount,
  isOnline,
  onClick,
}) => {
  return (
    <Link
      href={`/chat/${id}`}
      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl"
    >
      {/* Avatar */}
      <figure className="shrink-0 relative">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl} alt={title} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
        {/* Online badge */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 block size-3.5 rounded-full bg-green-500 border-2 border-white"></span>
        )}
      </figure>

      {/* Chat info */}
      <article className="flex flex-col flex-1 justify-between gap-0.5">
        {/* Title + date */}
        <header className="flex justify-between items-center">
          <h2 className="font-medium text-base">{title}</h2>
          <time
            dateTime={date.toString()}
            className="text-xs text-muted-foreground"
          >
            {date.toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
          </time>
        </header>

        {/* Last message + unread badge */}
        <section className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage}
          </p>
          <Badge className="rounded-full bg-muted-foreground text-white">
            {unreadCount}
          </Badge>
        </section>
      </article>
    </Link>
  );
};

export default ChatListItem;
