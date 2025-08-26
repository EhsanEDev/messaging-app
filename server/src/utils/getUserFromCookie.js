import verifyToken from "./verifyToken.js";

export default function getUserFromCookie(req) {
  const cookies = req.cookies;
  // console.log(cookies);

  if (!cookies) return null;

  const token = cookies.authToken;
  if (!token) return null;

  const payload = verifyToken(token);
  return payload;
}