import {
  ChatMetadata,
  ChatSendMsg,
  ClientToServerEvent,
  Identifier,
  ServerToClientEvent,
  UserStatus,
} from "@/shared/types.js";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { ChatRepo } from "../db/fake/repo/chats.js";
import { MessageRepo } from "../db/fake/repo/messages.js";
import { StatusRepo } from "../db/fake/repo/status.js";

// Single instance of the socket.io
let io: Server<ClientToServerEvent, ServerToClientEvent> | undefined;

export const WebSocket = {
  /*************************************************************
   * Initialize the Socket.IO server (singleton)
   *
   * @param server - Instance of http server
   * @returns Instance of the socket.io
   ************************************************************/
  init: (server: HttpServer) => {
    if (io) return io;

    io = new Server<ClientToServerEvent, ServerToClientEvent>(server, {
      cors: { origin: process.env.CLIENT_BASE_URL, credentials: true },
    });

    return io;
  },

  /*************************************************************
   * Notify the chat created to all participants
   *
   * @param chat - the created and stored chat on database
   * @returns void
   ************************************************************/
  notifyChatCreated: (chat: ChatMetadata) => {
    if (io === undefined) return;
    chat.participants.forEach((participant) => {
      io?.to(`user:${participant.id}`).emit("chat:created", chat);
    });
  },

  /*************************************************************
   * Joins the requested user to a new room, which only is used
   * for realtime emits and events between the user and server.
   *
   * @param socket - Specific socket instance only for this user
   * @param data - the requested user id
   * @returns void
   ************************************************************/
  onUserJoin: (
    socket: Socket<ClientToServerEvent, ServerToClientEvent>,
    data: Identifier
  ) => {
    // Join the user
    socket.join(`user:${data.id}`);
    console.log(data.id, "joined");

    // Set the user as online
    StatusRepo.setOnline(data.id);

    // Join the user to their chats and emit them its online status
    const chatList = ChatRepo.findByUser(data.id);
    chatList.forEach((chat) => {
      socket.join(`chat:${chat.id}`);
      socket.broadcast.to(`chat:${chat.id}`).emit("user:online", [
        {
          id: data.id,
          isOnline: true,
          lastSeenAt: null,
        },
      ]);
    });

    // Store the userId in the socket
    socket.data.userId = data.id;
  },

  /*************************************************************
   * Prepares list of online contacts and emits their online status
   * if they are online for the current user.
   *
   * @param socket - Specific socket instance only for this user
   * @returns void
   ************************************************************/
  onUserStatus: (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
    // Request user status
    const userId = socket.data.userId;
    // console.log(userId, "requested status");

    const chatList = ChatRepo.findByUser(userId);
    if (chatList.length === 0) return;
    const contacts = new Set<string>();
    const statusList: UserStatus[] = [];

    // Filter contacts of the current user
    chatList.forEach((chat) => {
      chat.participants.forEach((participant) => {
        if (participant.id !== userId) {
          contacts.add(participant.id);
        }
      });
    });
    if (contacts.size === 0) return;

    // Prepare the status list of contacts who are online
    Array.from(contacts).map((userId) => {
      const status = StatusRepo.findByUserId(userId);
      if (status && status.isOnline) {
        statusList.push(status);
      }
    });
    if (statusList.length === 0) return;

    // Emit the online status list to the current user
    socket.emit("user:online", statusList);
  },

  /*************************************************************
   * Joins the user to the requested chat room that created before.
   *
   * @param socket - Specific socket instance only for this user
   * @param data - the requested chat id
   * @returns void
   ************************************************************/
  onChatJoin: (
    socket: Socket<ClientToServerEvent, ServerToClientEvent>,
    data: Identifier
  ) => {
    // console.log(`User (${socket.data.userId}) joined to chat (${id})`);
    socket.join(`chat:${data.id}`);

    const chat = ChatRepo.findById(data.id);
    if (!chat) return;
    const statusList: UserStatus[] = [];

    // Filter contacts of current user and make a list of their status who are online
    chat.participants.forEach((participant) => {
      if (participant.id !== socket.data.userId) {
        const status = StatusRepo.findByUserId(participant.id);
        if (status && status.isOnline) {
          statusList.push(status);
        }
      }
    });
    if (statusList.length === 0) return;

    // Emit the online status list to the current user
    socket.emit("user:online", statusList);
  },

  /*************************************************************
   * Stores sent message by the user and emits it to the target chat
   *
   * @param socket - Specific socket instance only for this user
   * @param data - contains the message data and the target chat
   * @returns void
   ************************************************************/
  onMessageSend: (socket: Socket<ClientToServerEvent>, data: ChatSendMsg) => {
    // console.log("Sending message:", data);
    const message = MessageRepo.store(
      data.chatId,
      socket.data.userId,
      data.content
    );
    // console.log("New message created:", message);

    io?.to(`chat:${data.chatId}`).emit("message:receive", message);
  },

  /*************************************************************
   * Do anything you want before the socket will disconnect:
   *  1. Set the user as offline
   *  2. Emit the user offline status to all chats
   *
   * @param socket - Specific socket instance only for this user
   * @returns void
   ************************************************************/
  onDisconnect: (socket: Socket<ClientToServerEvent>) => {
    // NOTE: The User and their chats are left automatically upon disconnection
    if (socket.user) {
      console.log(socket.user.id, "leaved");
      // Set the user as offline
      const lastSeenAt = StatusRepo.setOffline(socket.user.id);

      // Emit to all chats its offline status
      const chatList = ChatRepo.findByUser(socket.user.id);
      chatList.forEach((chat) => {
        io?.to(`chat:${chat.id}`).emit("user:offline", {
          id: socket.user.id,
          isOnline: false,
          lastSeenAt,
        });
      });
    }
  },
};
