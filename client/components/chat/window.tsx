"use client";

import { useSocket } from "@/hooks/useSocket";
import { ChatMetadata, Message } from "@/shared/types";
import ChatComposer from "./composer";
import ChatThread from "./thread";
import ChatToolbar from "./toolbar";

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
  const { ws, messages } = useSocket();
  console.log(messages);
  
  return (
    <>
      <ChatToolbar
        chatId={chatId}
        metaData={initialMetadata}
        // title={initialMetadata.title}
        // avatarUrl={initialMetadata.avatarUrl}
        // info={
        //   initialMetadata.type === "group"
        //     ? `${initialMetadata.participants.length} participants`
        //     : "last seen recently"
        // }
        // typingUsers={typingUsers}
      />
      <ChatThread initialMessages={initialMessages} messages={messages} />
      <ChatComposer
        chatId={chatId}
        onSendMessage={ws.sendMessage}
        // onStartTyping={startTyping}
        // onStopTyping={stopTyping}
      />
    </>
  );
}
