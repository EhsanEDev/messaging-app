"use client";

import Loading from "@/components/common/loading";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { WebSocket } from "@/lib/socket";
import { Chat, Message, UserStatus } from "@/shared/types";
import { createContext, useEffect, useState } from "react";

type UserStatusMap = Record<string, UserStatus>;

type SocketContextType = {
  socket: typeof WebSocket;
  messages: Record<string, Message[]>;
  setMessages: (messages: Record<string, Message[]>) => void;
  chats: Record<string, Chat>;
  setChats: (chats: Record<string, Chat>) => void;
  userStatus: UserStatusMap;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { addMessage, messages, setMessages, chats, addChat, setChats } =
    useChat();
  const [userStatus, setUserStatus] = useState<UserStatusMap | {}>({});

  useEffect(() => {
    // null user
    if (!user) return;

    // Initialize socket on mounting
    const socket = WebSocket.init();
    WebSocket.JoinUser({ id: user.id });

    // Request user status
    WebSocket.RequestUserStatus();

    socket.on("message:receive", (message: Message) => {
      // console.log("New message received: ", message);
      addMessage(message);
    });

    socket.on("chat:created", (chat) => {
      // console.log("New chat created: ", chat);
      WebSocket.JoinChat({ id: chat.id });
      addChat(chat);
    });

    socket.on("user:online", (data) => {
      data.forEach((status) => {
        setUserStatus((prev) => ({
          ...prev,
          [status.id]: { isOnline: true, lastSeenAt: null },
        }));
      });
    });

    socket.on("user:offline", ({ id, lastSeenAt }) => {
      setUserStatus((prev) => ({
        ...prev,
        [id]: { isOnline: false, lastSeenAt },
      }));
    });

    socket.on("user:offline", ({ id, lastSeenAt }) => {
      setUserStatus((prev) => ({
        ...prev,
        [id]: { isOnline: false, lastSeenAt },
      }));
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
      value={{
        socket: WebSocket,
        messages,
        setMessages,
        chats,
        setChats,
        userStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
