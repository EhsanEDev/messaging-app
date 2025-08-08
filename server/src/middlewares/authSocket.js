import getUserFromCookie from "../utils/getUserFromCookie.js";

export default function authSocket(socket, next) {
  const req = socket.request;
  const payload = getUserFromCookie(req);

  if (!payload) {
    return next(new Error("Unauthorized: Invalid or missing token"));
  }

  console.log(payload);
  socket.user = payload;
  next();
}
