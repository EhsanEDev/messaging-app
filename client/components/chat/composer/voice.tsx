import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";

const VoiceInput: React.FC = () => {
  return (
    <Button
      variant="ghost"
      className="size-12 rounded-full cursor-pointer bg-background hover:bg-primary! group"
      aria-label="Send voice message"
    >
      <MicIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground" />
    </Button>
  );
};

export default VoiceInput;
