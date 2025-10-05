"use client";

import { useSocket } from "@/hooks/useSocket";
import { Chat, Message } from "@/shared/types";
import ChatComposer from "./composer";
import ChatThread from "./thread";
import ChatToolbar from "./toolbar";
import { useEffect } from "react";
import { initMessages } from "@/store/slices/chatSlice";
import { useAppDispatch } from "@/hooks/useStore";

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
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initMessages({ chatId, messages: initialMessages }));
  }, [chatId, initialMessages]);

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
      <ChatThread chatId={chatId} />
      <ChatComposer
        chatId={chatId}
        onSendMessage={socket.sendMessage}
        // onStartTyping={startTyping}
        // onStopTyping={stopTyping}
      />
    </>
  );
}
