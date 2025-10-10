import { ClientToServerEvent, ServerToClientEvent } from "@/shared/types.js";
import dotenv from "dotenv";
import { Socket } from "socket.io";
import authSocket from "../middlewares/socket.js";
import { WebSocket } from "../utils/socket.js";
import { server } from "./http.js";
dotenv.config();

// Initialize socket service once
const io = WebSocket.init(server);

// Attach socket middleware globally
io.use(authSocket);

// Handle socket connections
// Every connection will have a unique socket ID
// That each ID represents a specific user session
io.on(
  "connection",
  (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
    socket.on("user:join", (user) => WebSocket.onUserJoin(socket, user));
    socket.on("user:status", () => WebSocket.onUserStatus(socket));
    socket.on("chat:join", (chat) => WebSocket.onChatJoin(socket, chat));
    socket.on("typing:start", (chat) => WebSocket.onTypingStart(socket, chat));
    socket.on("typing:stop", (chat) => WebSocket.onTypingStop(socket, chat));
    socket.on("message:send", (msg) => WebSocket.onMessageSend(socket, msg));
    socket.on("disconnect", () => WebSocket.onDisconnect(socket));
  }
);

export default io;
