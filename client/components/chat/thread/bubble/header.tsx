import { Message } from "@/constants/types";

interface IProps {
    message: Message;
}

const BubbleHeader: React.FC<IProps> = ({ message }) => {
  return (
    <header>
      <h2 className="chat-sender text-sm font-bold text-primary">
        {message.sender.name}
      </h2>
    </header>
  );
};

export default BubbleHeader;
