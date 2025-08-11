import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

interface IProps {}

const HeaderPanel: React.FC<IProps> = () => {
  return (
    <header className="h-16 flex items-center px-5 gap-4 border-b-border border-b-1">
      <SidebarTrigger />
      <div className="relative w-full">
        <SearchIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-11 py-5 rounded-full bg-muted border-0"
        />
      </div>
    </header>
  );
};

export default HeaderPanel;
