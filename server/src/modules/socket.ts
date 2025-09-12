import { ClientToServerEvent, ServerToClientEvent } from "@/shared/types.js";
import { Server, Socket } from "socket.io";
import authSocket from "../middlewares/socket.js";
import { server } from "./http.js";
import dotenv from "dotenv";
dotenv.config();

// Create a Socket.IO server over HTTP server
export const io = new Server<ClientToServerEvent, ServerToClientEvent>(server, {
  cors: { origin: process.env.CLIENT_BASE_URL },
});

// Attach socket middleware globally
io.use(authSocket);

// function emitEvent<K extends keyof ServerToClientEvent>(
//   socket: Socket<ClientToServerEvent, ServerToClientEvent>,
//   event: K,
//   ...args: Parameters<ServerToClientEvent[K]>
// ) {
//   socket.emit(event, ...args);
// }
function emitToUser<K extends keyof ServerToClientEvent>(
  receiverId: string,
  event: K,
  ...args: Parameters<ServerToClientEvent[K]>
) {
  io.to(`user:${receiverId}`).emit(event, ...args);
}
// Handle socket connections
// Every connection will have a unique socket ID
// That each ID represents a specific user session
io.on("connection", (socket: Socket<ClientToServerEvent>) => {
  console.log("A user connected");

  socket.on("user:join", ({ userId }) => {
    console.log(`(${userId}) joined`);
    // @TODO Join the user to their rooms
    // get user chat list array from database
    // const chatList = ChatRepo.findUserChats(userId);
    // chatList.forEach((chat) => {
    //   socket.join(`chat:${chat.id}`);
    // });
    socket.data.userId = userId;
  });

  socket.on("message:send", (data) => {
    console.log("Sending message:", data);
    emitToUser(data.receiverId, "message:receive", {
      id: "0",
      receiverId: data.receiverId,
      senderId: socket.data.userId,
      content: data.content,
      createdAt: String(new Date()),
    });
  });

  // socket.on("chat:send-message", (data) => {
  //   console.log("Sending private message:", data);
  //   const message = MessageRepo.store(
  //     data.receiverId,
  //     socket.data.userId,
  //     data.content
  //   );
  //   console.log("Private message sent:", message);

  //   socket.to(`user:${data.receiverId}`).emit("chat:receive-message", message);
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
