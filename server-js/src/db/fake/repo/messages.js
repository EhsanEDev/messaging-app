let messages = [];

export const MessageRepo = {
  findByChatId(chatId) {
    return messages.filter((m) => m.chatId === chatId);
  },

  store(receiverId, senderId, content) {
    const message = {
      id: messages.length + 1,
      receiverId,
      senderId,
      content,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};
