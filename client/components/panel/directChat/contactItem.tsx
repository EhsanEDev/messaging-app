import Avatar from "@/components/common/avatar";
import { formatStatus, isOnline } from "@/lib/user-status";
import { Contact, UserStatus } from "@/shared/types";

interface IProps {
  contact: Contact;
  status: UserStatus | null;
  onClick?: () => void; // handler when item clicked
}

const ContactItem: React.FC<IProps> = ({ contact, status, onClick }) => {
  const formattedStatus = formatStatus(status);

  return (
    <li
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl cursor-pointer"
    >
      {/* Avatar */}
      <Avatar
        src={contact.avatarUrl}
        title={contact.username}
        isOnline={isOnline(formattedStatus)}
      />

      {/* Chat info */}
      <article className="flex flex-col flex-1 justify-between gap-0.5">
        {/* Title + date */}
        <header className="flex flex-col">
          <h2 className="font-medium text-base">{contact.username}</h2>
          <p className="text-xs text-muted-foreground">{formattedStatus}</p>
        </header>
      </article>
    </li>
  );
};

export default ContactItem;
