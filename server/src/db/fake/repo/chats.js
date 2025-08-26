let chats = [];

export const ChatRepo = {
  findAll() {
    return chats;
  },

  findById(id) {
    return chats.find((c) => c.id === id) || null;
  },

  create(participantIds) {
    const chat = {
      id: String(Date.now() + Math.random()),
      participantIds,
      createdAt: new Date().toISOString(),
    };
    chats.push(chat);
    return chat;
  },
};
