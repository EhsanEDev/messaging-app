import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/shared/types";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import MessageBubble from "./thread/bubble";
import ScrollToBottom from "./thread/scrollToBottom";

interface IProps {
  initialMessages: Array<Message>;
  // messages: Array<Message>;
}

const ChatThread: React.FC<IProps> = ({ initialMessages }) => {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const fakeMessages: Array<Message> = [
    {
      id: "1",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "2",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "3",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "4",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "5",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "6",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "7",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "8",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "9",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "10",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "11",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "12",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "13",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "14",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "15",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "16",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "17",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "18",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "19",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "20",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "21",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "22",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "23",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "24",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "25",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677110",
        username: "Ehsan",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "26",
      chatId: "1",
      createdAt: String(new Date()),
      content: "Hello",
      sender: {
        id: "1756280677140",
        username: "Clare",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    },
  ];
  return (
    <main className="relative overflow-y-hidden h-full flex-1">
      <ScrollArea ref={scrollRef} className="h-full">
        <ul className="max-w-6xl mx-auto flex flex-col-reverse gap-5 p-5">
          {fakeMessages.map((msg) => {
            const isOwn = msg.sender.id === user?.id;
            return <MessageBubble key={msg.id} message={msg} isOwn={isOwn} />;
          })}
        </ul>
      </ScrollArea>
      <ScrollToBottom
        scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
      />
    </main>
  );
};

export default ChatThread;
