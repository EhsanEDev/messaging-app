"use client";

import { useChatSocket } from "@/hooks/useChatSocket";
import ChatToolbar from "./toolbar";
import ChatThread from "./thread";
import ChatComposer from "./composer";
import { ChatMetadata, Message } from "@/constants/types";

// import { useAuth } from "@/hooks/useAuth";

interface ChatWindowProps {
  chatId: string;
  initialMetadata: ChatMetadata;
  initialMessages: Array<Message>;
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
        info={initialMetadata.participants?.length.toString()}
        // typingUsers={typingUsers}
      />
      <ChatThread initialMessages={initialMessages} messages={messages} />
      <ChatComposer
        onSendMessage={sendMessage}
        onStartTyping={startTyping}
        onStopTyping={stopTyping}
      />
    </>
  );
}
