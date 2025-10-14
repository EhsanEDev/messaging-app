import Avatar from "@/components/common/avatar";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { formatStatus, isOnlineInDirect } from "@/lib/user-status";
import { Contact, UserStatus } from "@/shared/types";

interface IProps {
  contact: Contact;
  status: UserStatus | null;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean, contact: Contact) => void; // handler when item clicked
}

const ContactItem: React.FC<IProps> = ({
  contact,
  status,
  defaultChecked,
  disabled = false,
  onChange,
}) => {
  const formattedStatus = formatStatus(status);

  const handleOnClick = (value: boolean) => {
    if (onChange) onChange(value, contact);
  };

  return (
    <Label htmlFor={contact.id}>
      <li
        // onClick={handleOnClick}
        className="flex-1 flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-xl cursor-pointer"
      >
        {/* Avatar */}
        <Avatar
          src={contact.avatarUrl}
          title={contact.username}
          isOnline={isOnlineInDirect(formattedStatus)}
        />

        {/* Chat info */}
        <article className="flex-1 flex flex-row justify-between items-center gap-0.5">
          {/* Title + date */}
          <header className="flex-1 flex flex-col">
            <h2 className="font-medium text-base">{contact.username}</h2>
            <p className="font-normal text-xs text-muted-foreground">
              {formattedStatus}
            </p>
          </header>
          {/* check box */}
          {!disabled && (
            <Checkbox
              onCheckedChange={handleOnClick}
              className="cursor-pointer"
              id={contact.id}
              defaultChecked={defaultChecked}
            />
          )}
        </article>
      </li>
    </Label>
  );
};

export default ContactItem;
