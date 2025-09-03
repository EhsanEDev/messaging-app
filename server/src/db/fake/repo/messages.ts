import { Message } from "../../../constants/types.js";

let messages: Message[] = [];

export const MessageRepo = {
  findByChatId(chatId: string) {
    return messages.filter((m) => m.chatId === chatId);
  },

  store(receiverId: string, senderId: string, content: string) {
    const message: Message = {
      id: String(messages.length + 1),
      chatId: receiverId,
      senderId,
      content,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
