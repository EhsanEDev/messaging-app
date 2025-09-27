import Avatar from "@/components/common/avatar";
import { formatStatus, isOnline } from "@/lib/user-status";
import { User, UserStatus } from "@/shared/types";

interface IProps {
  user: User;
  status: UserStatus | null;
  onClick?: () => void; // handler when item clicked
}

const ContactItem: React.FC<IProps> = ({ user, status, onClick }) => {
  const formattedStatus = formatStatus(status);

  return (
    <li
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl cursor-pointer"
    >
      {/* Avatar */}
      <Avatar
        src={user.avatarUrl}
        title={user.username}
        isOnline={isOnline(formattedStatus)}
      />

      {/* Chat info */}
      <article className="flex flex-col flex-1 justify-between gap-0.5">
        {/* Title + date */}
        <header className="flex flex-col">
          <h2 className="font-medium text-base">{user.username}</h2>
          <p className="text-xs text-muted-foreground">{formattedStatus}</p>
        </header>
      </article>
    </li>
  );
};

export default ContactItem;
