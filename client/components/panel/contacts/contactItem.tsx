import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/constants/types";
import Link from "next/link";

interface IProps {
  user: User;
  onClick?: () => void; // handler when item clicked
}

const ContactItem: React.FC<IProps> = ({ user, onClick }) => {
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
        {/* {user.isOnline && ( */}
        {/* <span className="absolute bottom-0 right-0 block size-3.5 rounded-full bg-green-500 border-2 border-white"></span> */}
        {/* )} */}
      </figure>

      {/* Chat info */}
      <article className="flex flex-col flex-1 justify-between gap-0.5">
        {/* Title + date */}
        <header className="flex flex-col">
          <h2 className="font-medium text-base">{user.username}</h2>
          <p className="text-xs text-muted-foreground">last seen recently</p>
        </header>
      </article>
    </li>
  );
};

export default ContactItem;
