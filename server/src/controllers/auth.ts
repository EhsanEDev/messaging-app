import { type Request, type Response } from "express";
import AuthService from "../services/auth.js";
import jwt from "jsonwebtoken";
import { User } from "@/shared/types.js";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    try {
      // Signup the user
      const newUser = await AuthService.signup(username, password, email);
      // Signed up successfully, Generate JWT token and attach it to response
      AuthController._attachTokenToResp(newUser, res);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  signin: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      // Signin the user
      const user = await AuthService.signin(username, password);
      // Signed in successfully, Generate JWT token and attach it to response
      AuthController._attachTokenToResp(user, res);
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

  _attachTokenToResp: async (user: User, res: Response) => {
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
  },
};

export default AuthController;
