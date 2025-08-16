"use client";

import { Message, TypingUser } from "@/constants/types";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseChatSocketOptions {
  chatId: string;
  userId: string;
}

export function useChatSocket({ chatId, userId }: UseChatSocketOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Connect socket when hook mounts
  useEffect(() => {
    const socketInstance = io("", {
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    socketInstance.emit("join-chat", { chatId, userId });

    socketInstance.on("chat:message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on("chat:typing-started", (typingUser: TypingUser) => {
      setTypingUsers((prev) => {
        if (prev.some((u) => u.userId === typingUser.userId)) return prev;
        return [...prev, typingUser];
      });
    });

    socketInstance.on("chat:typing-stopped", (typingUser: TypingUser) => {
      setTypingUsers((prev) =>
        prev.filter((u) => u.userId !== typingUser.userId)
      );
    });

    return () => {
      socketInstance.emit("leave-chat", { chatId, userId });
      socketInstance.disconnect();
    };
  }, [chatId, userId]);

  // Emit message
  const sendMessage = useCallback(
    (text: string) => {
      if (!socket) return;
      socket.emit("chat:send-message", { chatId, userId, text });
    },
    [socket, chatId, userId]
  );

  // Typing events
  const startTyping = useCallback(() => {
    if (!socket) return;
    socket.emit("chat:start-typing", { chatId, userId });
  }, [socket, chatId, userId]);

  const stopTyping = useCallback(() => {
    if (!socket) return;
    socket.emit("chat:stop-typing", { chatId, userId });
  }, [socket, chatId, userId]);

  return {
    messages,
    typingUsers,
    sendMessage,
    startTyping,
    stopTyping,
  };
}
