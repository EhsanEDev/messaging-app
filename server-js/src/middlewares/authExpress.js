import Auth from "../utils/auth.js";

export default function authExpress(req, res, next) {
  const payload = Auth.getUserFromCookie(req);
  // console.log(payload);

  if (!payload) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or missing token" });
  }

  // console.log(payload);
  req.user = payload;
  next();
}
