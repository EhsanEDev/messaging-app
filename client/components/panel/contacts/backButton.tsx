import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface IProps {
  onClick: () => void;
}

const BackButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      className="size-11 rounded-full cursor-pointer"
      aria-label="Search in chat"
      onClick={onClick}
    >
      <ArrowLeftIcon className="size-6 text-muted-foreground" />
    </Button>
  );
};

export default BackButton;
