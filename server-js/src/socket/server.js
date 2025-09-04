import { Server } from "socket.io";
import { server } from "../socket/server.js";

//Create a Socket.IO server
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_BASE_URL },
});

// attach socket middleware globally
io.use(authSocket);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat:join", (data) => registerUser(socket, data));
  socket.on("chat:send-message", (data) => sendPrivateMsg(socket, data));
  // socket.on(SOCKET_EVENTS.SEND_GROUP_MESSAGE, (data) =>
  //   sendGroupMsg(socket, data)
  // );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
