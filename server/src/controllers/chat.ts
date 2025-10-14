import { ChatCreate } from "@/shared/types.js";
import { type Request, type Response } from "express";
import ChatService, { CreatChatError } from "../services/chat.js";
import { WebSocket } from "../utils/socket.js";

const ChatController = {
  list: async (req: Request, res: Response) => {
    try {
      const list = await ChatService.list(req.user.id);
      res.status(200).json(list);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  create: async (req: Request, res: Response) => {
    const { type, name, membersId }: ChatCreate = req.body;

    try {
      const newChat = await ChatService.create(
        req.user.id,
        type,
        name,
        membersId
      );

      // Notify members about the new chat
      WebSocket.notifyChatCreated(newChat);

      res.status(201).json(newChat);
    } catch (error) {
      if (error instanceof CreatChatError) {
        res.status(200).json(error.chat);
      } else if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  metaData: async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const chat = await ChatService.metaData(chatId);
      res.status(200).json(chat);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  messages: async (req: Request, res: Response) => {
    const { chatId } = req.params;

    try {
      const messages = await ChatService.messages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};

export default ChatController;
