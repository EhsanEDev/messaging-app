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

const ChatService = {
  list: async (id: string): Promise<ChatMetadata[]> => {
    return ChatRepo.findByIdInParticipants(id) || [];
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

    // get participants by id
    const owner: Participant = {
      ...(ContactRepo.findById(ownerId) as Contact),
      role: "owner",
    };
    const participants: Participant[] = participantsId.map((id) => ({
      ...(ContactRepo.findById(id) as Contact),
      role: "member",
    }));

    let newChat: ChatMetadata | undefined;
    if (type === "direct") {
      newChat = ChatRepo.createDirect({
        visibility: "private",
        participants: [owner, ...participants],
      });
    } else if (type === "group") {
      newChat = ChatRepo.createGroup({
        title: `chat ${Date.now()}`,
        visibility: "private",
        participants: [owner, ...participants],
      });
    } else if (type === "channel") {
      newChat = ChatRepo.createChannel({
        title: `channel ${Date.now()}`,
        visibility: "private",
        participants: [owner, ...participants],
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
    const messages = MessageRepo.findByChatId(id);

    // Validate messages
    if (messages.length === 0) {
      throw new Error("No message found");
    }

    return messages;
  },
};

export default ChatService;
