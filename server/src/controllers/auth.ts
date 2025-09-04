import { type Request, type Response } from "express";
import AuthService from "../services/auth.js";
import jwt from "jsonwebtoken";

const AuthController = {
  me: async (req: Request, res: Response) => {
    try {      
      const user = await AuthService.me(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: "User not found" });
    }
  },

  signup: async (req: Request, res: Response) => {
    // const { username, password } = req.body;
    // const result = UserRepo.register(username, password);
    // if (result.error) {
    //   return res.status(result.status).json({ message: result.error });
    // }
    // res.status(201).json({ message: "User registered successfully" });
  },

  signin: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      // Sign in the user
      const user = await AuthService.signin(username, password);
      // Signed in successfully, Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "12h" }
      );
      res
        .cookie("authToken", token, {
          httpOnly: true, // 🔐 can't access via JS (protects from XSS)
          secure: process.env.NODE_ENV === "production", // 🔒 in production only over HTTPS
          sameSite: "strict",
          path: "/",
          maxAge: 1000 * 60 * 60 * 12, // 12 hours
        })
        .status(200)
        .json({
          message: "Signed in successfully",
          user: {
            id: user.id,
            username: user.username,
            avatarUrl: user.avatarUrl,
          },
        });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  signout: async (req: Request, res: Response) => {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Signed out" });
  },
};

export default AuthController;
