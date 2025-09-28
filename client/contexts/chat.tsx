"use client";

import { Chat, Message } from "@/shared/types";
import { createContext, useCallback, useState } from "react";

interface ChatContextValue {
  chats: Record<string, Chat>;
  messages: Record<string, Message[]>;
  addMessage: (message: Message) => void;
  setChats: (chats: Record<string, Chat>) => void;
  addChat: (chat: Chat) => void;
  setMessages: (messages: Record<string, Message[]>) => void;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined
);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChatState] = useState<Record<string, Chat>>({});
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => ({
      ...prev,
      [message.chatId]: [...(prev[message.chatId] || []), message],
    }));

    setChatState((prev) => ({
      ...prev,
      [message.chatId]: {
        ...prev[message.chatId],
        lastMessage: message,
      },
    }));
  }, []);

  const setChats = useCallback((chats: Record<string, Chat>) => {
    setChatState(chats);
  }, []);

  const addChat = useCallback((chat: Chat) => {
    setChatState((prev) => ({
      ...prev,
      [chat.id]: chat,
    }));
  }, []);

  return (
    <ChatContext.Provider
      value={{ chats, setChats, addChat, messages, addMessage, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}
