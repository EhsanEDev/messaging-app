import verifyToken from "../utils/verifyToken.js";

export default function authSocket(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  const payload = verifyToken(token);

  if (!payload) {
    return next(new Error("Invalid or expired token"));
  }

  socket.user = payload; // attach to socket
  next();
}