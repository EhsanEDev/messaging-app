import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IProps {
  avatarUrl?: string;
  title: string;
}

const ChatAvatar: React.FC<IProps> = ({ avatarUrl, title }) => {
  return (
    <Avatar className="size-11">
      <AvatarImage src={avatarUrl} alt={title} />
      <AvatarFallback>{title.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default ChatAvatar;
