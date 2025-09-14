import {
  ChatMetadata,
  ClientToServerEvent,
  ServerToClientEvent,
} from "@/shared/types.js";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server<ClientToServerEvent, ServerToClientEvent> | undefined;

export const SocketService = {
  /**
   * Initialize the Socket.IO server (singleton)
   */
  init: (server: HttpServer) => {
    if (io) return io;

    io = new Server<ClientToServerEvent, ServerToClientEvent>(server, {
      cors: { origin: process.env.CLIENT_BASE_URL, credentials: true },
    });

    return io;
  },

  /**
   * Get the singleton instance
   */
  getInstance: () => {
    if (io === undefined) {
      throw new Error("SocketService not initialized. Call init() first.");
    }
    return io;
  },

  /**
   * Let a socket join a single chat room
   */
  // joinUserToChat: (socket: Socket, chatId: string) => {
  //   socket.join(`chat:${chatId}`);
  //   console.log(`👥 ${socket.id} joined chat:${chatId}`);
  // },

  /**
   * Let a socket join multiple chat rooms
   */
  // joinUserToChats: (socket: Socket, chatIds: string[]) => {
  //   chatIds.forEach((chatId) => {
  //     SocketService.joinUserToChat(socket, chatId);
  //   });
  // },

  /**
   * Notify all users in a chat that it was created
   */
  notifyChatCreated: (chat: ChatMetadata) => {
    if (io === undefined) return;
    chat.participants.forEach((participant) => {
      io?.to(`user:${participant.id}`).emit("chat:created", chat);
    });
  },
};
