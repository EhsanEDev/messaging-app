"use client";

import { ChatMetadata, ChatReceiveMsg, Message } from "@/shared/types";
import { useSocket } from "@/hooks/useSocket";
import ChatComposer from "./composer";
import ChatThread from "./thread";
import ChatToolbar from "./toolbar";
import { WS, socket } from "@/lib/socket";

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
  const socketio = useSocket();
  // socket.onMessage((message) => {
  //   console.log("New message received:", message);
  // });
  socket?.on("chat:receive-message", (message: ChatReceiveMsg) => {
    console.log("New message received:", message);
  });

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
      <ChatThread initialMessages={initialMessages} />
      <ChatComposer
        chatId={chatId}
        onSendMessage={socketio.sendMessage}
        // onStartTyping={startTyping}
        // onStopTyping={stopTyping}
      />
    </>
  );
}
