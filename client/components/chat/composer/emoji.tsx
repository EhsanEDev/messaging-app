import { Button } from "@/components/ui/button";
import { SmileIcon } from "lucide-react";

const EmojiPicker: React.FC = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full cursor-pointer hover:bg-transparent focus-visible:ring-0 group"
      aria-label="Pick an emoji"
    >
      <SmileIcon className="size-6 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary" />
    </Button>
  );
};

export default EmojiPicker;
