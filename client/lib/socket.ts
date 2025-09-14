"use client";

import {
  ChatSendMsg,
  ClientToServerEvent,
  Identifier,
  ServerToClientEvent
} from "@/shared/types";
import { io, Socket } from "socket.io-client";

declare module "socket.io-client" {
  interface Socket {
    user: Identifier | null;
  }
}

// ---- Socket instance ----
let socket: Socket<ServerToClientEvent, ClientToServerEvent> | null = null;

export const WebSocket = {
  // Initialize socket & Make a singleton instance
  init: () => {
    if (socket) return socket; // prevent duplicate init

    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });

    socket.connect();
    socket.user = null;
    
    return socket;
  },

  disconnect: () => {
    // NOTE: User and chats are left automatically upon disconnection in the server side
    socket?.disconnect();
    socket = null;
  },

  // ---- Emitters ----

  JoinUser: (data: Identifier) => {
    if (!socket) return;
    socket.emit("user:join", data);
    socket.user = data; // Store the userId in the socket
  },

  sendMessage: (data: ChatSendMsg, ack: () => void) => {
    if (!socket || !socket.user) return;
    socket.emit("message:send", data);
    ack();
  },

  JoinChat: (data: Identifier) => {
    if (!socket || !socket.user) return;
    socket.emit("chat:join", data);
  },

  // ---- Listeners ----
  // onMessage: (callback: (msg: ChatReceiveMsg) => void) => {
  //   socket?.on("message:receive", callback);
  // },

  // onChatCreated: (callback: (data: ChatMetadata) => void) => {
  //   socket?.on("chat:created", callback);
  // },

  // onUserOnline: (callback: (data: Identifier) => void) => {
  //   socket?.on("user:online", callback);
  // },

  // onUserOffline: (callback: ServerToClientEvents["user:offline"]) => {
  //   socket?.on("user:offline", callback);
  // },

  // ---- Remove Listeners ----
  // removeListeners: () => {
  //   socket?.off("message:receive");
  //   socket?.off("chat:created");
  //   socket?.off("user:online");
  // },
};
