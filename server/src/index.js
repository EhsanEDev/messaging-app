import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import registerUser from "./socket/events/registerUser.js";
import sendPrivateMsg from "./socket/events/sendPrivateMsg.js";
import sendGroupMsg from "./socket/events/sendGroupMsg.js";
import authorization from "./routes/auth.js";
import authExpress from "./middlewares/authExpress.js";
import authSocket from "./middlewares/authSocket.js";

// Loads .env file contents into process.env
dotenv.config();

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

app.use(express.urlencoded({ extended: true }));
// Express public routes
app.use("/api/auth", authorization);
// Auth for everything after this
app.use(authExpress);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// attach socket middleware globally
io.use(authSocket);

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
