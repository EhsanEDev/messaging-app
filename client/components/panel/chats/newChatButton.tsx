import { Button } from "@/components/shadcn/button";
import { PencilIcon } from "lucide-react";

interface IProps {
  onClick: () => void;
}

const NewChatButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <Button
      className="absolute bottom-5 right-5 size-12 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <PencilIcon className="size-6" />
    </Button>
  );
};

export default NewChatButton;
