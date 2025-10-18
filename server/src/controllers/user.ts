import { type Request, type Response } from "express";
import UserService from "../services/user.js";

const UserController = {
  me: async (req: Request, res: Response) => {
    try {
      const user = await UserService.me(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: "User not found" });
    }
  },
}

export default UserController;