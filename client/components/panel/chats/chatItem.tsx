import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChatMetadata } from "@/constants/types";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface IProps {
  chat: ChatMetadata;
  onClick?: (id: string) => void; // handler when item clicked
}

const ChatItem: React.FC<IProps> = ({ chat, onClick }) => {
  const { user } = useAuth();
  // console.log(chat);
  if (!chat) return null;

  let chatTitle;
  let chatAvatarUrl;
  if (chat.type === "group") {
    // Render group chat item
    chatTitle = chat.title;
    chatAvatarUrl = chat.avatarUrl;
  } else {
    // Render individual chat item
    const participant = chat.participants.find((p) => p.id !== user?.id);
    chatTitle = participant?.username || chat.title;
    chatAvatarUrl = participant?.avatarUrl || chat.avatarUrl;
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
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage?.content}
            </p>
            <Badge className="rounded-full bg-muted-foreground text-white">
              {/* {chat.unreadCount} */}2
            </Badge>
          </section>
        </article>
      </li>
    </Link>
  );
};

export default ChatItem;
