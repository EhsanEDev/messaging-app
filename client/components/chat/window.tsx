"use client";

import { useSocket } from "@/hooks/useSocket";
import { Chat, Message } from "@/shared/types";
import { useEffect } from "react";
import ChatComposer from "./composer";
import ChatThread from "./thread";
import ChatToolbar from "./toolbar";

interface ChatWindowProps {
  chatId: string;
  initialMetadata: Chat;
  initialMessages: Array<Message>;
}

export default function ChatWindow({
  chatId,
  initialMetadata,
  initialMessages,
}: ChatWindowProps) {
  const { socket, messages, setMessages } = useSocket();
  // console.log(messages);
  console.log(messages);
  useEffect(() => {
    setMessages({ ...messages, [chatId]: initialMessages });
  }, [chatId, initialMessages, setMessages]);

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
      <ChatThread messages={messages[chatId] || []} />
      <ChatComposer
        chatId={chatId}
        onSendMessage={socket.sendMessage}
        // onStartTyping={startTyping}
        // onStopTyping={stopTyping}
      />
    </>
  );
}
