import { Message } from "@/constants/types";

interface IProps {
  message: Message;
}

const BubbleHeader: React.FC<IProps> = ({ message }) => {
  return (
    <header className="flex justify-between">
      <h2 className="chat-sender text-sm font-bold text-blue-500">
        {message.sender.username}
      </h2>
      <time className="text-xs text-muted-foreground">
        {new Date(message.createdAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </time>
    </header>
  );
};

export default BubbleHeader;
