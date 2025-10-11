import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Search as SearchIcon } from "lucide-react";
import { useId } from "react";

interface IProps {
  placeholder?: string;
}

const Search: React.FC<IProps> = ({ placeholder = "Search..." }) => {
  const id = useId(); // unique, stable id per component instance

  return (
    <div className="relative w-full">
      <Label htmlFor={id}>
        <SearchIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
      </Label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        className="pl-11 py-5 rounded-full bg-muted border-0"
      />
    </div>
  );
};

export default Search;
