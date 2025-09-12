import jwt from "jsonwebtoken";
import cookie from "cookie";
import type { Socket } from "socket.io";
import type { Request } from "express";

const Auth = {
  getUserFromCookie(source: Request | Socket): jwt.JwtPayload | null {
    let cookies;

    if ("cookies" in source) {
      // Express Request with cookies parsed by cookie-parser
      cookies = source.cookies;
    } else if ("handshake" in source && source.handshake.headers?.cookie) {
      // Socket.IO Socket with cookies in handshake headers
      cookies = cookie.parse(source.handshake.headers.cookie);
    } else {
      return null;
    }
    
    const token = cookies?.authToken;
    if (!token) return null;

    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    } catch (err) {
      console.error("Failed to verify token:", err);
      return null;
    }
  },

  // verifyToken: (token) => {
  //   try {
  //     return jwt.verify(token, process.env.JWT_SECRET as string);
  //   } catch (err) {
  //     return null;
  //   }
  // },
};

export default Auth;
