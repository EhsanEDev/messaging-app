import Auth from "../utils/auth.js";

export default function authSocket(socket, next) {
  const payload = Auth.getUserFromCookie(socket);
  // console.log(payload);

  if (!payload) {
    return next(new Error("Unauthorized: Invalid or missing token"));
  }

  socket.user = payload;
  next();
}
