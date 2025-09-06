import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";

interface IProps {}

const ScrollToBottom: React.FC<IProps> = () => {
  return (
    <Button
      className="sticky bottom-5 left-[calc(100%-3.5rem)] size-12 rounded-full cursor-pointer"
    //   onClick={onClick}
    >
      <ArrowDownIcon className="size-6" />
    </Button>
  );
};

export default ScrollToBottom;