import { ClientToServerEvent, ServerToClientEvent } from "@/shared/types.js";
import dotenv from "dotenv";
import { Socket } from "socket.io";
import { ChatRepo } from "../db/fake/repo/chats.js";
import { MessageRepo } from "../db/fake/repo/messages.js";
import authSocket from "../middlewares/socket.js";
import { SocketService } from "../utils/socket.js";
import { server } from "./http.js";
dotenv.config();

// Initialize socket service once
const io = SocketService.init(server);

// Attach socket middleware globally
io.use(authSocket);

// export function emitChatCreated(chat: ChatMetadata) {
//   chat.participants.forEach((participant) => {
//     io.to(`user:${participant.id}`).emit("chat:created", chat);
//   });
// }

// function emitEvent<K extends keyof ServerToClientEvent>(
//   socket: Socket<ClientToServerEvent, ServerToClientEvent>,
//   event: K,
//   ...args: Parameters<ServerToClientEvent[K]>
// ) {
//   socket.emit(event, ...args);
// }
export function emitToUser<K extends keyof ServerToClientEvent>(
  chatId: string,
  event: K,
  ...args: Parameters<ServerToClientEvent[K]>
) {
  io.to(`chat:${chatId}`).emit(event, ...args);
}
// Handle socket connections
// Every connection will have a unique socket ID
// That each ID represents a specific user session
io.on(
  "connection",
  (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
    // console.log("A user connected");

    socket.on("chat:join", ({ id }) => {
      console.log(`User (${socket.data.userId}) joined to chat (${id})`);
      socket.join(`chat:${id}`);
    });

    socket.on("user:join", ({ id }) => {
      // console.log(`(${id}) joined`);
      socket.join(`user:${id}`);
      // console.log(`(${id}) Online`);

      // Join the user to their chats
      const chatList = ChatRepo.findByIdInParticipants(id);
      chatList.forEach((chat) => {
        socket.join(`chat:${chat.id}`);
      });

      socket.data.userId = id;
    });

    socket.on("message:send", (data) => {
      console.log("Sending message:", data);
      const message = MessageRepo.store(
        data.chatId,
        socket.data.userId,
        data.content
      );
      console.log("New message created:", message);

      io.to(`chat:${data.chatId}`).emit("message:receive", message);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  }
);

export default io;
