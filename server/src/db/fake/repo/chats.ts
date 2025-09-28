import type {
  ChannelChat,
  Chat,
  DirectChat,
  GroupChat,
  Participant,
} from "@/shared/types.js";

const chats: Chat[] = [];

export const ChatRepo = {
  getAll(): Chat[] {
    return chats;
  },

  findById(id: string): Chat | null {
    return chats.find((c) => c.id === id) || null;
  },

  findByUser(id: string): Chat[] {
    return chats.filter((c) => c.participants.some((p) => p.id === id));
  },

  isDirectAlreadyExist(participants: Participant[]): Chat | undefined {
    // @TODO needs to optimization
    return chats.find(
      (c) =>
        c.type === "direct" &&
        c.participants
          .map((p) => p.id)
          .sort()
          .toString() ===
          participants
            .map((p) => p.id)
            .sort()
            .toString()
    );
  },

  createDirect(
    metadata: Omit<
      DirectChat,
      "id" | "type" | "createdAt" | "lastMessage"
    >
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
    metadata: Omit<
      GroupChat,
      "id" | "type" | "createdAt" | "lastMessage"
    >
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
    metadata: Omit<
      ChannelChat,
      "id" | "type" | "createdAt" | "lastMessage"
    >
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
