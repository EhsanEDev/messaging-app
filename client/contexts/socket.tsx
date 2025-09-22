"use client";

import Loading from "@/components/common/loading";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { WebSocket } from "@/lib/socket";
import { ChatMetadata, Message } from "@/shared/types";
import { createContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: typeof WebSocket;
  messages: Record<string, Message[]>;
  setMessages: (messages: Record<string, Message[]>) => void;
  chats: Record<string, ChatMetadata>;
  setChats: (chats: Record<string, ChatMetadata>) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { addMessage, messages, setMessages, chats, addChat, setChats } =
    useChat();
  // const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // null user
    if (!user) return;

    // Initialize socket on mounting
    const socket = WebSocket.init();
    WebSocket.JoinUser({ id: user.id });

    socket.on("message:receive", (message: Message) => {
      // console.log("New message received: ", message);
      addMessage(message);
    });

    socket.on("chat:created", (chat) => {
      // console.log("New chat created: ", chat);
      WebSocket.JoinChat({ id: chat.id });
      addChat(chat);
    });

    // cleanup on unmount
    return () => {
      socket.off("message:receive");
      socket.off("chat:created");
      WebSocket.disconnect();
    };
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <SocketContext.Provider
      value={{ socket: WebSocket, messages, setMessages, chats, setChats }}
    >
      {children}
    </SocketContext.Provider>
  );
};
