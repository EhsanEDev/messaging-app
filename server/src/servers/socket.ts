import { Server } from "socket.io";
import { server } from "./http.js";
import authSocket from "../middlewares/socket.js";
import { ChatJoin } from "@/shared/types.js";

// Create a Socket.IO server over HTTP server
export const io = new Server(server, {
  cors: { origin: process.env.CLIENT_BASE_URL },
});

// Attach socket middleware globally
io.use(authSocket);

// Handle socket connections
// Every connection will have a unique socket ID
// That each ID represents a specific user session
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat:join", ({ userId }: ChatJoin) => {
    console.log(`(${userId}) joined`);
    socket.join(`user:${userId}`);
    // socket.join(`group:family`);
    socket.data.userId = userId;
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
