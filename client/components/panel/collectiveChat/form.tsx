import FloatButton from "@/components/common/floatButton";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { ChatType } from "@/shared/types";
import { CameraIcon, CheckIcon } from "lucide-react";

interface IProps {
  type: Omit<ChatType, "Direct">;
  membersCount: number;
  onSubmit: (name: string) => void;
}

const MainForm: React.FC<IProps> = ({ type, onSubmit, membersCount }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const collName = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ).collName as string;

    onSubmit(collName);
  };

  const memberLabel = type === "Group" ? "member" : "subscriber";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 items-center p-8 pb-3 w-full"
    >
      <Label htmlFor="coll-image" className="cursor-pointer group">
        <Avatar className="size-32">
          <AvatarFallback>
            <CameraIcon className="text-muted-foreground size-12 group-hover:scale-120 transition-transform duration-300" />
          </AvatarFallback>
        </Avatar>
        <Input
          id="coll-image"
          name="collImage"
          type="file"
          className="hidden"
        />
      </Label>
      <Input
        id="coll-name"
        name="collName"
        placeholder={`${type} name...`}
        required
      />
      <p className="self-start text-muted-foreground">
        {membersCount === 1
          ? `${membersCount} ${memberLabel}`
          : `${membersCount} ${memberLabel}s`}
      </p>
      <FloatButton type="submit" tooltip={`Create ${type}`} icon={CheckIcon} />
    </form>
  );
};

export default MainForm;
