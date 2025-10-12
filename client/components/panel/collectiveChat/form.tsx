import { Avatar, AvatarFallback } from "@/components/shadcn/avatar";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { CameraIcon } from "lucide-react";
import NextButton from "./nextButton";

interface IProps {
  membersCount: number;
  onSubmit: (name: string) => void;
}

const MainForm: React.FC<IProps> = ({ onSubmit, membersCount }) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const groupName = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ).groupName as string;

    onSubmit(groupName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 items-center p-8 pb-3 w-full"
    >
      <Label htmlFor="group-image" className="cursor-pointer">
        <Avatar className="size-32">
          <AvatarFallback>
            <CameraIcon className="text-muted-foreground size-14" />
          </AvatarFallback>
        </Avatar>
        <Input
          id="group-image"
          name="groupImage"
          type="file"
          className="hidden"
        />
      </Label>
      <Input
        id="group-name"
        name="groupName"
        placeholder="Group name..."
        required
      />
      <p className="self-start text-muted-foreground">
        {membersCount === 1
          ? `${membersCount} member`
          : `${membersCount} members`}
      </p>
      <NextButton />
    </form>
  );
};

export default MainForm;
