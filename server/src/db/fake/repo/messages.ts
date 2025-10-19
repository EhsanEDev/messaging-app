import { Message } from "@/shared/types.js";
import { ChatRepo } from "./chats.js";

const messages: Message[] = [];

export const MessageRepo = {
  findByChatId(chatId: string) {
    return messages.filter((m) => m.chatId === chatId) || [];
  },

  findLastByChatId(chatId: string): Message | null {
    const chatMessages = messages.filter((m) => m.chatId === chatId) || [];
    if (chatMessages.length === 0) {
      return null;
    }
    return chatMessages[chatMessages.length - 1] || null;
  },

  store(chatId: string, senderId: string, content: string) {
    // Check if chat exists
    const chat = ChatRepo.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }
    // Get member info from chat
    const member = chat.members.find((m) => m.id === senderId);
    if (!member) {
      throw new Error("Member not found");
    }
    const message: Message = {
      id: messages.length + 1,
      chatId,
      sender: member,
      content,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
