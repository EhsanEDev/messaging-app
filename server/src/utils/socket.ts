import {
  ChatMetadata,
  ChatSendMsg,
  ClientToServerEvent,
  Identifier,
  ServerToClientEvent,
} from "@/shared/types.js";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { ChatRepo } from "../db/fake/repo/chats.js";
import { MessageRepo } from "../db/fake/repo/messages.js";

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
  onUserJoin: (socket: Socket<ClientToServerEvent>, data: Identifier) => {
    // Join the user
    socket.join(`user:${data.id}`);
    console.log(data.id, "joined");

    // Join the user to their chats
    const chatList = ChatRepo.findByIdInParticipants(data.id);
    chatList.forEach((chat) => {
      socket.join(`chat:${chat.id}`);
    });

    // Store the userId in the socket
    socket.data.userId = data.id;
  },

  /*************************************************************
   * Joins the user to the requested chat room that created before.
   *
   * @param socket - Specific socket instance only for this user
   * @param data - the requested chat id
   * @returns void
   ************************************************************/
  onChatJoin: (socket: Socket<ClientToServerEvent>, data: Identifier) => {
    // console.log(`User (${socket.data.userId}) joined to chat (${id})`);
    socket.join(`chat:${data.id}`);
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
   * Do anything you want before the socket will disconnect
   *
   * @param socket - Specific socket instance only for this user
   * @returns void
   ************************************************************/
  onDisconnect: (socket: Socket<ClientToServerEvent>) => {
    // NOTE: The User and their chats are left automatically upon disconnection
    if (socket.user) console.log(socket.user.id, "leaved");
  },
};
