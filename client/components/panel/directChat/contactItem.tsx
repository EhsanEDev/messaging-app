import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatLastSeen } from "@/lib/date-fns";
import { User, UserStatus } from "@/shared/types";

interface IProps {
  user: User;
  status: UserStatus | null;
  onClick?: () => void; // handler when item clicked
}

const ContactItem: React.FC<IProps> = ({ user, status, onClick }) => {
  const lastSeen = status?.isOnline
    ? "Online"
    : status?.lastSeenAt ? formatLastSeen(new Date(status?.lastSeenAt)) : "last seen recently";

  return (
    <li
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl cursor-pointer"
    >
      {/* Avatar */}
      <figure className="shrink-0 relative">
        <Avatar className="size-14">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback>{user.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        {/* Online badge */}
        {lastSeen === "Online" && (
          <span className="absolute bottom-0 right-0 block size-3.5 rounded-full bg-green-500 border-2 border-white"></span>
        )}
      </figure>

      {/* Chat info */}
      <article className="flex flex-col flex-1 justify-between gap-0.5">
        {/* Title + date */}
        <header className="flex flex-col">
          <h2 className="font-medium text-base">{user.username}</h2>
          <p className="text-xs text-muted-foreground">{lastSeen}</p>
        </header>
      </article>
    </li>
  );
};

export default ContactItem;
