import { cn } from "@/lib/utils";
import Image from "next/image";

type SizeClass = "size-6" | "size-8" | "size-10" | "size-11" | "size-12";

interface IProps {
  src: string | undefined;
  name: string;
  size: SizeClass;
}

const UserAvatar: React.FC<IProps> = ({ src, name, size = "size-10" }) => {
  return (
    <div
      className={cn(
        size,
        "bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-full overflow-hidden"
      )}
      //   className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-full overflow-hidden"
    >
      {!src ? (
        <span className="text-xl font-medium">{name.charAt(0)}</span>
      ) : (
        <Image
          src={src}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};

export default UserAvatar;
