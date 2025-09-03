import { ContactRepo } from "./contacts.js";

let chats = [];

export const ChatRepo = {
  findAll() {
    return chats;
  },
  findById(id) {
    return chats.find((c) => c.id === id) || null;
  },
  findByOwnerId(id) {
    return chats.find((c) => c.ownerId === id) || null;
  },

  createPrivate(ownerId, participantId) {
    const participant = ContactRepo.findById(participantId);
    const chat = {
      id: String(Date.now()),
      ownerId,
      type: "private",
      title: participant.username,
      avatarUrl: participant.avatarUrl,
      participants: [participant],
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(chat);
    console.log("New private chat created:", chat);

    return chat;
  },

  createGroup(currentId, participantIds) {
    const id = String(Date.now());
    const chat = {
      id,
      type: "group",
      title: `Group Chat ${id}`,
      avatarUrl: "",
      participants: [currentId, ...participantIds].map((id) =>
        ContactRepo.findById(id)
      ),
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(chat);
    return chat;
  },
};
