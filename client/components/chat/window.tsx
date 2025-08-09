import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {}

const ChatWindow: React.FC<IProps> = () => {
  return (
    <>
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Chat Title</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>more</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <article>bubbles, conversations</article>
      <footer>input, send, ...</footer>
    </>
  );
};

export default ChatWindow;
