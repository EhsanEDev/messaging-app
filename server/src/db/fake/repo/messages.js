let messages = [];

export const MessageRepo = {
  findByChatId(chatId) {
    return messages.filter((m) => m.chatId === chatId);
  },

  create(chatId, senderId, content) {
    const message = {
      id: String(Date.now()),
      chatId,
      senderId,
      content,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
