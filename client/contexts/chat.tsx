"use client";

import { ChatMetadata, Message } from "@/shared/types";
import { createContext, useCallback, useState } from "react";

interface ChatContextValue {
  chats: Record<string, ChatMetadata>;
  messages: Record<string, Message[]>;
  addMessage: (message: Message) => void;
  setChats: (chats: Record<string, ChatMetadata>) => void;
  addChat: (chat: ChatMetadata) => void;
  setMessages: (messages: Record<string, Message[]>) => void;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined
);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChatState] = useState<Record<string, ChatMetadata>>({});
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

  const setChats = useCallback((chats: Record<string, ChatMetadata>) => {
    setChatState(chats);
  }, []);

  const addChat = useCallback((chat: ChatMetadata) => {
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
