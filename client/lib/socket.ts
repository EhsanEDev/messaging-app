"use client";

import {
  ChatMetadata,
  ChatReceiveMsg,
  ChatSendMsg,
  ClientToServerEvent,
  Identifier,
  ServerToClientEvent,
} from "@/shared/types";
import { io, Socket } from "socket.io-client";

// ---- Socket instance ----
let socket: Socket<ServerToClientEvent, ClientToServerEvent> | null = null;

export const ws = {
  // Initialize socket & Make a singleton instance
  init: () => {
    if (socket) return socket; // prevent duplicate init

    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });

    socket.connect();
    return socket;
  },

  disconnect: () => {
    socket?.disconnect();
    socket = null;
  },

  // ---- Emitters ----

  JoinUser: (data: Identifier) => {
    socket?.emit("user:join", data);
  },

  sendMessage: (data: ChatSendMsg, ack: () => void) => {
    socket?.emit("message:send", data);
    ack();
  },

  JoinChat: (data: Identifier) => {
    socket?.emit("chat:join", data);
  },

  // ---- Listeners ----
  // onMessage: (callback: (msg: ChatReceiveMsg) => void) => {
  //   socket?.on("message:receive", callback);
  // },

  onChatCreated: (callback: (data: ChatMetadata) => void) => {
    socket?.on("chat:created", callback);
  },

  onUserOnline: (callback: (data: Identifier) => void) => {
    socket?.on("user:online", callback);
  },

  // onUserOffline: (callback: ServerToClientEvents["user:offline"]) => {
  //   socket?.on("user:offline", callback);
  // },

  // ---- Remove Listeners ----
  removeListeners: () => {
    socket?.off("message:receive");
    socket?.off("chat:created");
    socket?.off("user:online");
  },
};
