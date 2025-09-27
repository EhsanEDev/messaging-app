import { Button } from "@/components/ui/button";
import { SendHorizonalIcon } from "lucide-react";

interface IProps {
    onSend: () => void;
}

const SendText: React.FC<IProps> = ({ onSend }) => {
  return (
    <Button
      variant="ghost"
      className="size-11 rounded-full cursor-pointer bg-background hover:bg-primary group"
      aria-label="Send text message"
      onClick={() => {
        // Handle sending the text message
        onSend();
      }}
    >
      <SendHorizonalIcon className="size-6 text-primary group-hover:text-primary-foreground" />
    </Button>
  );
};

export default SendText;
