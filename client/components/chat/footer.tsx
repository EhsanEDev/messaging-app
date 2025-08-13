import { MicIcon, PaperclipIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {}

const ChatFooter: React.FC<IProps> = () => {
  return (
    <footer className="w-full flex gap-2 px-4">
      <section className="w-full flex justify-center items-center gap-1 bg-background px-4 py-2 mb-6 rounded-full">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer hover:bg-transparent focus-visible:ring-0 group"
          aria-label="Search in chat"
        >
          <SmileIcon className="size-6 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary" />
        </Button>
        <Input
          type="text"
          placeholder="Type your message..."
          className="border-0 rounded-lg px-1 mb-0.5 w-full flex-1 focus-visible:ring-0 shadow-none"
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer hover:bg-transparent focus-visible:ring-0 group"
          aria-label="Attach menu"
        >
          <PaperclipIcon className="size-6 text-muted-foreground group-hover:text-primary group-focus-visible:text-primary" />
        </Button>
      </section>
      <Button
        variant="ghost"
        className="size-14 rounded-full cursor-pointer bg-background hover:bg-primary group"
        aria-label="Search in chat"
      >
        <MicIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground" />
      </Button>
    </footer>
  );
};

export default ChatFooter;
