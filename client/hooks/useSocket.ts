"use client";

import { useEffect, useState } from "react";
import { ws } from "@/lib/socket";
import { useAuth } from "@/hooks/useAuth";
import { ChatReceiveMsg, Message } from "@/shared/types";

export function useSocket() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // null user
    if (!user) return;

    // init & connect
    const socket = ws.init();
    ws.JoinUser({ id: user.id });

    socket.on("message:receive", (message: Message) => {
      console.log("New message received: ", message);

      setMessages((prev) => [message, ...prev]);
    });
    socket.on("chat:created", (chat) => {
      console.log("New chat created: ", chat);
      ws.JoinChat({ id: chat.id });
    });

    // cleanup on unmount
    return () => ws.disconnect();
  }, [user]);

  return { ws, messages };
}
