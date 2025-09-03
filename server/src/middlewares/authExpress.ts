import type { Request, Response } from "express";
import Auth from "../utils/auth.js";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default function authExpress(req: Request, res: Response, next: any) {
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
