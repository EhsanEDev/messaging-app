import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";

interface IProps {}

const AttachMenu: React.FC<IProps> = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full cursor-pointer hover:bg-transparent focus-visible:ring-0 group"
      aria-label="Attach menu"
    >
      <PaperclipIcon className="size-6 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary" />
    </Button>
  );
};

export default AttachMenu;
