import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChatMetadata } from "@/shared/types";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface IProps {
  chat: ChatMetadata;
  onClick?: (id: string) => void; // handler when item clicked
}

const ChatItem: React.FC<IProps> = ({ chat, onClick }) => {
  const { user } = useAuth();
  // console.log(user);
  if (!chat) return null;

  let chatTitle;
  let chatAvatarUrl;
  let chatInfo;
  if (chat.type === "group") {
    chatTitle = chat.title;
    chatAvatarUrl = chat.avatarUrl;
    chatInfo = `${chat.participants.length} participants`;
  } else {
    const participant = chat.participants?.find((p) => p.id !== user.id);
    if (!participant) return;
    chatTitle = participant.username;
    chatAvatarUrl = participant.avatarUrl;
    chatInfo = "last seen recently";
  }

  return (
    <Link href={`/chat/${chat.id}`}>
      <li className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl">
        {/* Avatar */}
        <figure className="shrink-0 relative">
          <Avatar className="size-14">
            <AvatarImage src={chatAvatarUrl} alt={chatTitle} />
            <AvatarFallback>{chatTitle?.charAt(0)}</AvatarFallback>
          </Avatar>
          {/* Online badge */}
          {/* {chat.isOnline && ( */}
          <span className="absolute bottom-0 right-0 block size-3.5 rounded-full bg-green-500 border-2 border-white"></span>
          {/* )} */}
        </figure>

        {/* Chat info */}
        <article className="flex flex-col flex-1 justify-between gap-0.5">
          {/* Title + date */}
          <header className="flex justify-between items-center">
            <h2 className="font-medium text-base">{chatTitle}</h2>
            <time
              dateTime={chat.lastMessage?.createdAt.toString()}
              className="text-xs text-muted-foreground"
            >
              {chat.lastMessage?.createdAt &&
                new Date(chat.lastMessage.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
            </time>
          </header>

          {/* Last message + unread badge */}
          <section className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground mr-2 line-clamp-1">
              {chat.lastMessage?.content}
            </p>
            <Badge className="rounded-full bg-primary text-primary-foreground">
              {/* {chat.unreadCount} */}3
            </Badge>
          </section>
        </article>
      </li>
    </Link>
  );
};

export default ChatItem;
