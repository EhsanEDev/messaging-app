import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useStore";
import { useRef } from "react";
import MessageBubble from "./thread/bubble";
import ScrollToBottom from "./thread/scrollToBottom";

interface IProps {
  chatId: string;
  // initialMessages: Array<Message>;
}

const ChatThread: React.FC<IProps> = ({ chatId }) => {
  const { currentUser } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats = useAppSelector((state) => state.chat);

  return (
    <main className="relative overflow-y-hidden h-full flex-1">
      {/* <ScrollArea ref={scrollRef} className="h-full "> */}
      <ul className="h-full max-w-6xl mx-auto flex flex-col-reverse gap-5 p-5">
        {chats[chatId]?.messages.toReversed().map((msg) => {
          const isOwn = msg.sender.id === currentUser.id;
          return <MessageBubble key={msg.id} message={msg} isOwn={isOwn} />;
        })}
      </ul>
      {/* </ScrollArea> */}
      <ScrollToBottom
        scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
      />
    </main>
  );
};

export default ChatThread;
