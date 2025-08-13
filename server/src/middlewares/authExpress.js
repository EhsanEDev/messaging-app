import getUserFromCookie from "../utils/getUserFromCookie.js";

export default function authExpress(req, res, next) {
  console.log(req);

  const payload = getUserFromCookie(req);

  if (!payload) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or missing token" });
  }

  console.log(payload);
  req.user = payload;
  next();
}
