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
    socket.on("user:join", (data) => WebSocket.onUserJoin(socket, data));
    socket.on("chat:join", (data) => WebSocket.onChatJoin(socket, data));
    socket.on("message:send", (data) => WebSocket.onMessageSend(socket, data));
    socket.on("disconnect", () => WebSocket.onDisconnect(socket));
  }
);

export default io;
