// import { io } from "socket.io-client";

// export const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
//   withCredentials: true, // Enable sending cookies with requests automatically
//   autoConnect: false,
//   transports: ["websocket"],
// });

// const sendMessage = (chatId, userId, text, ack) => {
//   socket.emit("chat:send-message", { chatId, userId, text }, ack);
// };
// src/lib/socketClient.ts
"use client";

import { ChatJoin, ChatReceiveMsg, ChatSendMsg } from "@/constants/types";
import { io, Socket } from "socket.io-client";

// ---- Socket instance ----
export let socket: Socket | null = null;

export const WS = {
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

  register: (data: ChatJoin) => {
    socket?.emit("chat:join", data);
  },

  sendMessage: (data: ChatSendMsg, ack: () => void) => {
    socket?.emit("chat:send-message", data);
    ack();
  },

  // createChat: (participantIds: string[]) => {
  //   socket?.emit("chat:create", { participantIds });
  // },

  // ---- Listeners ----
  onMessage: (callback: (msg: ChatReceiveMsg) => void) => {
    socket?.on("chat:receive-message", callback);
  },

  // onChatCreated: (callback: ServerToClientEvents["chat:created"]) => {
  //   socket?.on("chat:created", callback);
  // },

  // onUserOnline: (callback: ServerToClientEvents["user:online"]) => {
  //   socket?.on("user:online", callback);
  // },

  // onUserOffline: (callback: ServerToClientEvents["user:offline"]) => {
  //   socket?.on("user:offline", callback);
  // },
};
