import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import Auth from "../utils/auth.js";

declare module "socket.io" {
  interface Socket {
    user: JwtPayload;
  }
}

export default function authSocket(
  socket: Socket,
  next: (err?: Error) => void
) {
  const payload = Auth.getUserFromCookie(socket);
  console.log(payload);

  if (!payload) {
    return next(new Error("Unauthorized: Invalid or missing token"));
  }

  socket.user = payload;
  next();
}
