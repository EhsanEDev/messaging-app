import type { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Auth from "../utils/auth.js";

// Extend Express Request interface to include 'user'
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export default function authExpress(req: Request, res: Response, next: () => void) {
  const payload = Auth.getUserFromCookie(req);
  // console.log(payload);

  if (!payload) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or missing token" });
  }

  req.user = payload;
  next();
}
