"use client";

import {
  MessageSend,
  ClientToServerEvent,
  Identifier,
  ServerToClientEvent,
} from "@/shared/types";
import { io, Socket } from "socket.io-client";

declare module "socket.io-client" {
  interface Socket {
    user: Identifier | null;
  }
}

// Single instance of the socket.io-client
let socket: Socket<ServerToClientEvent, ClientToServerEvent> | null = null;

export const WebSocket = {
  /*************************************************************
   * Initialize socket & Make a singleton instance
   *
   * @returns Instance of the socket.io-client
   ************************************************************/
  init: () => {
    // Prevent duplicate init
    if (socket) return socket;

    // Initialize and make a socket instance
    socket = io("/api", {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });

    // Connects the socket.io instance to the server
    socket.connect();
    socket.user = null;

    return socket;
  },

  /*************************************************************
   * Disconnects the socket.io from server
   *
   * NOTE: All rooms and chats are left automatically upon
   * disconnection in the server side.
   *
   * @param server - Instance of http server
   ************************************************************/
  disconnect: () => {
    socket?.disconnect();
    socket = null;
  },

  /*************************************************************
   * Request to join the user to a socket by provided user id
   *
   * @param data - itself user id
   ************************************************************/
  JoinUser: (userId: Identifier) => {
    if (!socket) return;
    socket.emit("user:join", userId);
    socket.user = userId; // Store the userId in the socket object
  },

  /*************************************************************
   * Request to join the user to a chat by provided chat id
   *
   * @param data - target chat id
   ************************************************************/
  JoinChat: (chatId: Identifier) => {
    if (!socket || !socket.user) return;
    socket.emit("chat:join", chatId);
  },

  /*************************************************************
   * Request to send the message to the target chat id
   *
   * @param data - contains message content and target chat id
   * @param ack - a callback function to acknowledge message sent to the sender
   ************************************************************/
  sendMessage: (msg: MessageSend, ack: () => void) => {
    if (!socket || !socket.user) return;
    socket.emit("message:send", msg);
    ack();
  },

  /*************************************************************
   *
   *
   ************************************************************/
  RequestUserStatus: () => {
    if (!socket || !socket.user) return;
    socket.emit("user:status");
  },

  /*************************************************************
   * Request to start typing in the chat
   *
   * @param chatId - the chat id where the user is typing
   ************************************************************/
  StartTyping: (chatId: Identifier) => {
    if (!socket || !socket.user) return;
    socket.emit("typing:start", chatId);
  },

  /*************************************************************
   * Request to stop typing in the chat
   *
   * @param chatId - the chat id where the user stopped typing
   ************************************************************/
  StopTyping: (chatId: Identifier) => {
    if (!socket || !socket.user) return;
    socket.emit("typing:stop", chatId);
  },
};
