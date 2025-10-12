import { Button } from "@/components/shadcn/button";
import { ForwardIcon } from "lucide-react";

interface IProps {
  onClick?: () => void;
}

const NextButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <Button
    type="submit"
      className="absolute bottom-5 right-5 size-12 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <ForwardIcon className="size-6" />
    </Button>
  );
};

export default NextButton;
