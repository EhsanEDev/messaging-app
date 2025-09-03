import { Server } from "socket.io";
import { server } from "../index.js";
import authSocket from "../middlewares/authSocket.js";
import { MessageRepo } from "../db/fake/repo/messages.js";

//Create a Socket.IO server
const io = new Server(server, {
  cors: { origin: process.env.BASE_URL },
});

// attach socket middleware globally
io.use(authSocket);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat:join", (data) => {
    console.log("User joined:", data);
    socket.join(`user:${data.userId}`);
    // socket.join(`group:family`);
    socket.data.userId = data.userId;
  });

  socket.on("chat:send-message", (data) => {
    console.log("Sending private message:", data);
    const message = MessageRepo.store(
      data.receiverId,
      socket.data.userId,
      data.content
    );
    console.log("Private message sent:", message);

    socket.to(`user:${data.receiverId}`).emit("chat:receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
