import { Message } from "@/shared/types.js";
import { ContactRepo } from "./contacts.js";

const messages: Message[] = [];

export const MessageRepo = {
  findByChatId(chatId: string) {
    return messages.filter((m) => m.chatId === chatId);
  },

  store(chatId: string, senderId: string, content: string) {
    const sender = ContactRepo.findById(senderId);
    if (!sender) {
      throw new Error("Sender not found");
    }
    const message: Message = {
      id: String(messages.length + 1),
      chatId,
      sender,
      content,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
