import {
  ChatMetadata,
  ChatType,
  Contact,
  Message,
  Participant,
} from "@/shared/types.js";
import { ChatRepo } from "../db/fake/repo/chats.js";
import { ContactRepo } from "../db/fake/repo/contacts.js";
import { MessageRepo } from "../db/fake/repo/messages.js";
import { UserRepo } from "../db/fake/repo/users.js";
import chat from "../routes/chat.js";

// Define a custom Error to return the exist direct chat in the create chat process
export class CreatChatError extends Error {
  chat?: ChatMetadata;

  constructor(message: string, chat: ChatMetadata) {
    super(message);
    this.chat = chat;
  }
}

const ChatService = {
  list: async (id: string): Promise<ChatMetadata[]> => {
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
    participantsId: string[]
  ): Promise<ChatMetadata> => {
    // Validate input
    if (!Array.isArray(participantsId) || participantsId.length === 0) {
      throw new Error("Bad create chat request");
    }

    // Validate chat type
    if (type !== "direct" && type !== "group" && type !== "channel") {
      throw new Error("Invalid chat type");
    }

    // Validate participants
    if (!UserRepo.validate(participantsId)) {
      throw new Error("Invalid participant IDs");
    }

    // Get profile of owner
    const owner: Participant = {
      ...(ContactRepo.findById(ownerId) as Contact),
      role: "owner",
    };
    // Get profiles of participants except owner
    const participantsExceptOwner: Participant[] = participantsId.map((id) => ({
      ...(ContactRepo.findById(id) as Contact),
      role: "member",
    }));
    // Make all participants array
    const participants = [owner, ...participantsExceptOwner];

    // Check if this direct chat is already exist
    const existChat = ChatRepo.isDirectAlreadyExist(participants);
    if (existChat) {
      throw new CreatChatError("This direct chat already exist", existChat);
    }

    let newChat: ChatMetadata | undefined;
    if (type === "direct") {
      newChat = ChatRepo.createDirect({
        visibility: "private",
        participants,
      });
    } else if (type === "group") {
      newChat = ChatRepo.createGroup({
        title: `chat ${Date.now()}`,
        visibility: "private",
        participants,
      });
    } else if (type === "channel") {
      newChat = ChatRepo.createChannel({
        title: `channel ${Date.now()}`,
        visibility: "private",
        participants,
      });
    }

    // Validate created chat
    if (newChat === undefined) {
      throw new Error("Something went wrong");
    }

    return newChat;
  },

  metaData: async (id: string | undefined): Promise<ChatMetadata> => {
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
