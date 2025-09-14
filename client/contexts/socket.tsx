"use client";

import Loading from "@/components/common/loading";
import { useAuth } from "@/hooks/useAuth";
import { WebSocket } from "@/lib/socket";
import { Message } from "@/shared/types";
import { createContext, useEffect, useState } from "react";

type SocketContextType = {
  socket: typeof WebSocket;
  messages: Message[];
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // null user
    if (!user) return;

    // Initialize socket on mounting
    const socket = WebSocket.init();
    WebSocket.JoinUser({ id: user.id });

    socket.on("message:receive", (message: Message) => {
      // console.log("New message received: ", message);
      setMessages((prev) => [message, ...prev]);
    });

    socket.on("chat:created", (chat) => {
      // console.log("New chat created: ", chat);
      WebSocket.JoinChat({ id: chat.id });
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
    <SocketContext.Provider value={{ socket: WebSocket, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
