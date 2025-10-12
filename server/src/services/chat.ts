import {
  Chat,
  ChatType,
  Contact,
  Message,
  Member,
} from "@/shared/types.js";
import { ChatRepo } from "../db/fake/repo/chats.js";
import { ContactRepo } from "../db/fake/repo/contacts.js";
import { MessageRepo } from "../db/fake/repo/messages.js";
import { UserRepo } from "../db/fake/repo/users.js";
import chat from "../routes/chat.js";

// Define a custom Error to return the exist direct chat in the create chat process
export class CreatChatError extends Error {
  chat?: Chat;

  constructor(message: string, chat: Chat) {
    super(message);
    this.chat = chat;
  }
}

const ChatService = {
  list: async (id: string): Promise<Chat[]> => {
    const list = ChatRepo.findByUser(id) || [];
    if (!list) {
      throw new Error("There are no chats");
    }
    // Map chat metadata to include last message
    return list.map((chat) => {
      return {
        ...chat,
        lastMessage: MessageRepo.findLastByChatId(chat.id),
      };
    });
  },

  create: async (
    ownerId: string,
    type: ChatType,
    name: string | undefined,
    membersId: string[]
  ): Promise<Chat> => {
    // Validate input
    if (!Array.isArray(membersId) || membersId.length === 0) {
      throw new Error("Bad create chat request");
    }

    // Validate chat type
    if (type !== "direct" && type !== "group" && type !== "channel") {
      throw new Error("Invalid chat type");
    }

    // Validate members
    if (!UserRepo.validate(membersId)) {
      throw new Error("Invalid member IDs");
    }

    // Get profile of owner
    const owner: Member = {
      ...(ContactRepo.findById(ownerId) as Contact),
      role: "owner",
    };
    // Get profiles of members except owner
    const membersExceptOwner: Member[] = membersId.map((id) => ({
      ...(ContactRepo.findById(id) as Contact),
      role: "member",
    }));
    // Make all members array
    const members = [owner, ...membersExceptOwner];

    // Check if this direct chat is already exist
    const existChat = ChatRepo.isDirectAlreadyExist(members);
    if (existChat) {
      throw new CreatChatError("This direct chat already exist", existChat);
    }

    let newChat: Chat | undefined;
    if (type === "direct") {
      newChat = ChatRepo.createDirect({
        visibility: "private",
        members,
      });
    } else if (type === "group") {
      console.log("Creating group chat:", name);
      
      newChat = ChatRepo.createGroup({
        title: name || `group ${Date.now()}`,
        visibility: "private",
        members,
      });
    } else if (type === "channel") {
      newChat = ChatRepo.createChannel({
        title: name || `channel ${Date.now()}`,
        visibility: "private",
        members,
      });
    }

    // Validate created chat
    if (newChat === undefined) {
      throw new Error("Something went wrong");
    }

    return newChat;
  },

  metaData: async (id: string | undefined): Promise<Chat> => {
    // Validate input
    if (!id) {
      throw new Error("Chat ID is required");
    }

    // Get chat metadata by id
    const meta = ChatRepo.findById(id);

    //
    if (!meta) {
      throw new Error("Chat not found");
    }
    return meta;
  },

  messages: async (id: string | undefined): Promise<Message[]> => {
    // Validate input
    if (!id) {
      throw new Error("Chat ID is required");
    }

    // Get all chat messages
    return MessageRepo.findByChatId(id);
  },
};

export default ChatService;
