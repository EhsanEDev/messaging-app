import cookie from "cookie";
import verifyToken from "./verifyToken.js";

export default function getUserFromCookie(req) {
  // console.log("Headers:", req.headers);
  const cookies = req.headers?.cookie;

  if (!cookies) return null;

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.authToken;
  if (!token) return null;

  const payload = verifyToken(token);
  return payload;
}