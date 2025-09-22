import { useAuth } from "@/hooks/useAuth";
import { Message } from "@/shared/types";
import { useRef } from "react";
import MessageBubble from "./thread/bubble";
import ScrollToBottom from "./thread/scrollToBottom";

interface IProps {
  messages: Array<Message>;
}

const ChatThread: React.FC<IProps> = ({ messages }) => {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative overflow-y-hidden h-full flex-1">
      {/* <ScrollArea ref={scrollRef} className="h-full "> */}
      <ul className="h-full max-w-6xl mx-auto flex flex-col-reverse gap-5 p-5">
        {messages.toReversed().map((msg) => {
          const isOwn = msg.sender.id === user.id;
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
