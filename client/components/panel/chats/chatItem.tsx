import Avatar from "@/components/common/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useStore";
import { formatStatus, isOnline } from "@/lib/user-status";
import { cn } from "@/lib/utils";
import { Chat } from "@/shared/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  chat: Chat | null;
  // onClick?: (id: string) => void; // handler when item clicked
}

const ChatItem: React.FC<IProps> = ({ chat }) => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const contacts = useAppSelector((state) => state.user.contact);

  // console.log(pathname);
  if (!chat) return null;

  let chatTitle;
  let chatAvatarUrl;
  let chatStatus: string | null = null;
  // let chatInfo;
  if (chat.type === "group") {
    chatTitle = chat.title;
    chatAvatarUrl = chat.avatarUrl;
    // chatInfo = `${chat.participants.length} participants`;
  } else {
    const participant = chat.participants?.find((p) => p.id !== currentUser.id);
    if (!participant) return;
    chatTitle = participant.username;
    chatAvatarUrl = participant.avatarUrl;
    chatStatus = formatStatus(contacts[participant.id].status);
    // chatInfo = "last seen recently";
  }

  const isSelected = pathname.includes(chat.id);

  return (
    <Link href={`/chat/${chat.id}`}>
      <li
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl",
          { "bg-primary hover:bg-primary": isSelected }
        )}
      >
        {/* Avatar */}
        <Avatar
          src={chatAvatarUrl}
          title={chatTitle}
          isOnline={isOnline(chatStatus)}
        />

        {/* Chat info */}
        <article className="flex flex-col flex-1 justify-between gap-0.5">
          {/* Title + date */}
          <header className="flex justify-between items-center">
            <h2
              className={cn("font-medium text-base", {
                "text-primary-foreground": isSelected,
              })}
            >
              {chatTitle}
            </h2>
            <time
              dateTime={chat.lastMessage?.createdAt.toString()}
              className={cn("text-xs ", {
                "text-primary-foreground": isSelected,
                "text-muted-foreground": !isSelected,
              })}
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
            <p
              className={cn("text-xs mr-2 line-clamp-1", {
                "text-primary-foreground": isSelected,
                "text-muted-foreground": !isSelected,
              })}
            >
              {chat.lastMessage?.content}
            </p>
            <Badge
              variant="outline"
              className="rounded-full bg-muted text-foreground"
            >
              {/* {chat.unreadCount} */}3
            </Badge>
          </section>
        </article>
      </li>
    </Link>
  );
};

export default ChatItem;
