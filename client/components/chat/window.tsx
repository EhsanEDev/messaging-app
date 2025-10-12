"use client";

import { useSocket } from "@/hooks/useSocket";
import { useAppDispatch } from "@/hooks/useStore";
import { Chat, Message } from "@/shared/types";
import { initChats, initMessages } from "@/store/slices/chatSlice";
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
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initChats([initialMetadata]));
    dispatch(initMessages({ chatId, messages: initialMessages }));
  }, [chatId, initialMessages, initialMetadata, dispatch]);

  return (
    <>
      <ChatToolbar
        metaData={initialMetadata}
        // title={initialMetadata.title}
        // avatarUrl={initialMetadata.avatarUrl}
        // info={
        //   initialMetadata.type === "group"
        //     ? `${initialMetadata.members.length} members`
        //     : "last seen recently"
        // }
        // typingUsers={typingUsers}
      />
      <ChatThread chatId={chatId} />
      <ChatComposer
        chatId={chatId}
        onSendMessage={socket.sendMessage}
        onStartTyping={socket.StartTyping}
        onStopTyping={socket.StopTyping}
      />
    </>
  );
}
