"use client";

import {
  ChatSendMsg,
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
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
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
  JoinUser: (data: Identifier) => {
    if (!socket) return;
    socket.emit("user:join", data);
    socket.user = data; // Store the userId in the socket object
  },

  /*************************************************************
   * Request to join the user to a chat by provided chat id
   *
   * @param data - target chat id
   ************************************************************/
  JoinChat: (data: Identifier) => {
    if (!socket || !socket.user) return;
    socket.emit("chat:join", data);
  },

  /*************************************************************
   * Request to send the message to the target chat id
   *
   * @param data - contains message content and target chat id
   * @param ack - a callback function to acknowledge message sent to the sender
   ************************************************************/
  sendMessage: (data: ChatSendMsg, ack: () => void) => {
    if (!socket || !socket.user) return;
    socket.emit("message:send", data);
    ack();
  },

  RequestUserStatus: () => {
    if (!socket || !socket.user) return;
    socket.emit("user:status");
  }
};
