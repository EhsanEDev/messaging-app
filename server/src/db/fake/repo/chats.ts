import type {
  ChannelChatMetaData,
  ChatMetadata,
  DirectChatMetaData,
  GroupChatMetaData,
} from "@/shared/types.js";

const chats: ChatMetadata[] = [];

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
