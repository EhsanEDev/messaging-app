import type { ChatMetadata, User } from "@/shared/types.js";
import { ContactRepo } from "./contacts.js";

let chats: ChatMetadata[] = [];

export const ChatRepo = {
  findAll() {
    return chats;
  },
  findById(id: string) {
    return chats.find((c) => c.id === id) || null;
  },
  findByIdInParticipants(id: string) {
    return chats.filter((c) => c.participants.some((p) => p.id === id));
  },

  createPrivate(currentId: string, participantId: string) {
    const currentUser = ContactRepo.findById(currentId);
    if (!currentUser) {
      throw new Error(`Participant with id ${currentId} not found`);
    }
    const participant = ContactRepo.findById(participantId);
    if (!participant) {
      throw new Error(`Participant with id ${participantId} not found`);
    }
    const chat: ChatMetadata = {
      id: String(Date.now()),
      type: "private",
      participants: [currentUser, participant].map((p, i) => ({
        ...p,
        role: i === 0 ? "owner" : "member",
      })),
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(chat);
    // console.log("New private chat created:", chat);

    return chat;
  },

  createGroup(currentId: string, participantIds: string[]) {
    // const id = String(Date.now());
    // const chat: ChatMetadata = {
    //   id,
    //   type: "group",
    //   title: `Group Chat ${id}`,
    //   avatarUrl: "",
    //   participants: [currentId, ...participantIds]
    //     .map((id) => ContactRepo.findById(id))
    //     .filter((user): user is Omit<User, "password"> => user !== null),
    //   lastMessage: null,
    //   createdAt: new Date().toISOString(),
    // };
    // chats.push(chat);
    // return chat;
  },
};
