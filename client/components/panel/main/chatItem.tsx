import Avatar from "@/components/common/avatar";
import { useChatData } from "@/hooks/useChatData";

import { cn } from "@/lib/utils";
import { Chat } from "@/shared/types";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  chat: Chat | null;
  // onClick?: (id: string) => void; // handler when item clicked
}

const ChatItem: React.FC<IProps> = ({ chat }) => {
  const pathname = usePathname();

  if (!chat) return null;

  const { chatTitle, chatAvatarUrl, chatInfo, isOnline } = useChatData({
    mode: "item",
    chat,
  });

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
          icon={chat.members.length < 2 ? BookmarkIcon : undefined}
          isOnline={isOnline}
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
              {chatInfo}
            </p>
            {/* <Badge
              variant="outline"
              className="rounded-full bg-muted text-foreground"
            >
              {chat.unreadCount}
            </Badge> */}
          </section>
        </article>
      </li>
    </Link>
  );
};

export default ChatItem;
