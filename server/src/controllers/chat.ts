import { type Request, type Response } from "express";
import ChatService from "../services/chat.js";
import { ChatCreate } from "@/shared/types.js";
import { SocketService } from "../utils/socket.js";

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
    const { type, participantsId }: ChatCreate = req.body;

    try {
      const newChat = await ChatService.create(
        req.user.id,
        type,
        participantsId
      );

      // Notify participants about the new chat
      SocketService.NotifyChatCreated(newChat);

      return res.status(201).json(newChat);
    } catch (error) {
      if (error instanceof Error) {
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
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }

    // const { page = 1, perPage = 10, fromId } = req.query;

    // Simulate fetching messages from a database
    // res.status(200).json(
    //   [
    //     {
    //       id: "1",
    //       chatId: "chat1",
    //       sender: {
    //         id: "0",
    //         username: "User 0",
    //         avatarUrl: `https://i.pravatar.cc/150?img=0`,
    //       },
    //       content: "Hello!",
    //       createdAt: new Date().toISOString(),
    //     },
    //     {
    //       id: "2",
    //       chatId: "chat1",
    //       sender: {
    //         id: "1",
    //         username: "User 1",
    //         avatarUrl: `https://i.pravatar.cc/150?img=1`,
    //       },
    //       content: "Hi there!",
    //       createdAt: new Date().toISOString(),
    //       reactedBy: [
    //         {
    //           id: "0",
    //           username: "User 0",
    //           avatarUrl: `https://i.pravatar.cc/150?img=0`,
    //           emoji: "👍",
    //           reactedAt: new Date().toISOString(),
    //         },
    //       ],
    //     },
    //     {
    //       id: "3",
    //       chatId: "chat1",
    //       sender: {
    //         id: "0",
    //         username: "User 0",
    //         avatarUrl: `https://i.pravatar.cc/150?img=0`,
    //       },
    //       content: "How are you?",
    //       createdAt: new Date().toISOString(),
    //     },
    //     {
    //       id: "4",
    //       chatId: "chat1",
    //       sender: {
    //         id: "1",
    //         username: "User 1",
    //         avatarUrl: `https://i.pravatar.cc/150?img=1`,
    //       },
    //       content: "I'm good, thanks!",
    //       createdAt: new Date().toISOString(),
    //     },
    //   ].reverse()
    // );
  },
};

export default ChatController;
