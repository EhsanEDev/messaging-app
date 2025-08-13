import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface IProps {}

const SearchInChat: React.FC<IProps> = () => {
  return (
    <Button
      variant="ghost"
      className="size-11 rounded-full cursor-pointer"
      aria-label="Search in chat"
    >
      <Search className="size-5 text-muted-foreground" />
    </Button>
  );
};

export default SearchInChat;
