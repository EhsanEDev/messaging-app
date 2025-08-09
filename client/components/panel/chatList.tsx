import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface IProps {}

const ChatListPanel: React.FC<IProps> = () => {
  return (
    <nav className="bg-background w-1/3 h-screen border-r-border border-r-2">
      <header className="flex items-center px-4 py-2 gap-4 border-b-border border-b-1">
        <SidebarTrigger />
        <div className="relative w-full">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-11 py-5 rounded-full bg-muted"
          />
        </div>
      </header>
      Chat List Panel
    </nav>
  );
};

export default ChatListPanel;
