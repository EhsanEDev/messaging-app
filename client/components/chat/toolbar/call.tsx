import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const Call: React.FC = () => {
  return (
    <Button
      variant="ghost"
      className="size-11 rounded-full cursor-pointer"
      aria-label="Search in chat"
    >
      <PhoneIcon className="size-5 text-muted-foreground" />
    </Button>
  );
};

export default Call;