import type {
  ChannelChatMetaData,
  ChatMetadata,
  DirectChatMetaData,
  GroupChatMetaData,
  Participant,
} from "@/shared/types.js";

const chats: ChatMetadata[] = [];

export const ChatRepo = {
  getAll(): ChatMetadata[] {
    return chats;
  },

  findById(id: string): ChatMetadata | null {
    return chats.find((c) => c.id === id) || null;
  },

  findByUser(id: string): ChatMetadata[] {
    return chats.filter((c) => c.participants.some((p) => p.id === id));
  },

  isDirectAlreadyExist(participants: Participant[]): ChatMetadata | undefined {
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
      DirectChatMetaData,
      "id" | "type" | "createdAt" | "lastMessage"
    >
  ): ChatMetadata {
    const newChat: DirectChatMetaData = {
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
      GroupChatMetaData,
      "id" | "type" | "createdAt" | "lastMessage"
    >
  ): ChatMetadata {
    const newChat: GroupChatMetaData = {
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
      ChannelChatMetaData,
      "id" | "type" | "createdAt" | "lastMessage"
    >
  ): ChatMetadata {
    const newChat: ChannelChatMetaData = {
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
