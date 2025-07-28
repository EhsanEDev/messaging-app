import express from "express";
import http from "http";
import { Server } from "socket.io";
import registerUser from "./socket/events/registerUser.js"
import sendPrivateMsg from "./socket/events/sendPrivateMsg.js"
import sendGroupMsg from "./socket/events/sendGroupMsg.js"

// const { SOCKET_EVENTS } = require("@shared/constants/events");
const SOCKET_EVENTS = {
  REGISTER_USER: "register_user",
  SEND_PRIVATE_MESSAGE: "send_private_message",
  RECEIVE_PRIVATE_MESSAGE: "receive_private_message",
  SEND_GROUP_MESSAGE: "send_group_message",
  RECEIVE_GROUP_MESSAGE: "receive_group_message",
};

//Create an Express application
const app = express();
//Create an HTTP server with the Express app
const server = http.createServer(app);
//Create a Socket.IO server on top of the HTTP server
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on(SOCKET_EVENTS.REGISTER_USER, (data) => registerUser(socket, data));
  socket.on(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, (data) =>
    sendPrivateMsg(socket, data)
  );
  socket.on(SOCKET_EVENTS.SEND_GROUP_MESSAGE, (data) =>
    sendGroupMsg(socket, data)
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
