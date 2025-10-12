import type {
  ChannelChat,
  Chat,
  DirectChat,
  GroupChat,
  Member,
} from "@/shared/types.js";
import { MessageRepo } from "./messages.js";

const chats: Chat[] = [];

export const ChatRepo = {
  getAll(): Chat[] {
    return chats;
  },

  findById(id: string): Chat | null {
    const chat = chats.find((c) => c.id === id);
    if (chat) chat.lastMessage = MessageRepo.findLastByChatId(chat.id);
    return chat || null;
  },

  findByUser(id: string): Chat[] {
    return chats.filter((c) => c.members.some((p) => p.id === id));
  },

  isDirectAlreadyExist(members: Member[]): Chat | undefined {
    // @TODO needs to optimization
    return chats.find(
      (c) =>
        c.type === "direct" &&
        c.members
          .map((p) => p.id)
          .sort()
          .toString() ===
          members
            .map((p) => p.id)
            .sort()
            .toString()
    );
  },

  createDirect(
    metadata: Omit<DirectChat, "id" | "type" | "createdAt" | "lastMessage">
  ): Chat {
    const newChat: DirectChat = {
      ...metadata,
      id: String(Date.now()),
      type: "direct",
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(newChat);
    return newChat;
  },

  createGroup(
    metadata: Omit<GroupChat, "id" | "type" | "createdAt" | "lastMessage">
  ): Chat {
    const newChat: GroupChat = {
      ...metadata,
      id: String(Date.now()),
      type: "group",
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(newChat);
    return newChat;
  },

  createChannel(
    metadata: Omit<ChannelChat, "id" | "type" | "createdAt" | "lastMessage">
  ): Chat {
    const newChat: ChannelChat = {
      ...metadata,
      id: String(Date.now()),
      type: "channel",
      lastMessage: null,
      createdAt: new Date().toISOString(),
    };
    chats.push(newChat);
    return newChat;
  },
};
