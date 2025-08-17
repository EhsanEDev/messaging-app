import { Message } from "@/constants/types";

interface IProps {
    message: Message;
}

const BubbleFooter: React.FC<IProps> = ({ message }) => {
  return (
    <footer className="flex justify-between gap-2 items-baseline p-0">
      <span className="text-lg">&#128513;</span>
      <div className="flex gap-2">
        <time className="text-xs text-muted-foreground">
          {new Date(message.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </time>
        <span className="text-xs text-muted-foreground">//</span>
      </div>
    </footer>
  );
};

export default BubbleFooter;
