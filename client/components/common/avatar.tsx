import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SizeClass =
  | "size-6"
  | "size-8"
  | "size-10"
  | "size-11"
  | "size-12"
  | "size-13"
  | "size-14";

interface IProps {
  src: string | undefined;
  title: string;
  size?: SizeClass;
  isOnline?: boolean;
}

const UserAvatar: React.FC<IProps> = ({ src, title, size = "size-14", isOnline }) => {
  return (
    <figure className="shrink-0 relative">
      <Avatar className={size}>
        <AvatarImage src={src} alt={title} />
        <AvatarFallback>{title?.charAt(0)}</AvatarFallback>
      </Avatar>
      {/* Online badge */}
      {isOnline && (
        <span className="absolute bottom-0.5 right-0.5 block size-2.5 rounded-full bg-green-500 border-1 border-muted"></span>
      )}
    </figure>
  );
};

export default UserAvatar;
