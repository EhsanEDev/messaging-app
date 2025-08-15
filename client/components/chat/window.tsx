"use client";

import { useChatSocket } from "@/hooks/useChatSocket";
import ChatToolbar from "./toolbar";
import ChatThread from "./conversation";
import ChatComposer from "./composer";

// import { useAuth } from "@/hooks/useAuth";

interface ChatWindowProps {
  chatId: string;
  initialMetadata: {
    title: string;
    avatarUrl: string;
    membersCount: number;
  };
  initialMessages: Array<{
    id: string;
    sender: string;
    text: string;
    timestamp: string;
  }>;
}

export default function ChatWindow({
  chatId,
  initialMetadata,
  initialMessages,
}: ChatWindowProps) {
  const user = "useAuth()";

  const { messages, typingUsers, sendMessage, startTyping, stopTyping } =
    useChatSocket({
      chatId,
      userId: user,
      // initialMessages,
    });

  return (
    <>
      <ChatToolbar
        chatId={chatId}
        title={initialMetadata.title}
        avatarUrl={initialMetadata.avatarUrl}
        info={initialMetadata.membersCount.toString()}
        // typingUsers={typingUsers}
      />
      <ChatThread messages={messages} />
      <ChatComposer
        onSendMessage={sendMessage}
        onStartTyping={startTyping}
        onStopTyping={stopTyping}
      />
    </>
  );
}
