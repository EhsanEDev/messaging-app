import { Message } from "@/constants/types";
import MessageBubble from "./thread/bubble";
import { useAuth } from "@/hooks/useAuth";

interface IProps {
  initialMessages: Array<Message>;
  messages: Array<Message>;
}

const ChatThread: React.FC<IProps> = ({ initialMessages, messages }) => {
  const user = useAuth();
  return (
    <main className="h-full w-full max-w-6xl mx-auto">
      <ul className="h-full flex flex-col-reverse gap-1 p-5">
        {initialMessages.map((msg) => {
          const isOwn = msg.sender.id === user?.id;
          return <MessageBubble key={msg.id} message={msg} isOwn={isOwn} />;
        })}
      </ul>
    </main>
  );
};

export default ChatThread;
