import { type } from "os";
import { ContactRepo } from "./contacts.js";

let chats = [];

export const ChatRepo = {
  findAll() {
    return chats;
  },

  findById(id) {
    return chats.find((c) => c.id === id) || null;
  },

  createPrivate(participantId) {
    const participant = ContactRepo.findById(participantId);
    const id = String(Date.now());
    const chat = {
      id,
      type: "private",
      title: participant.username,
      avatarUrl: participant.avatarUrl,
      participants: [participant],
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(chat);
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
