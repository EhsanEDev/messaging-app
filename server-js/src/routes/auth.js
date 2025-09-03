import express from "express";
import jwt from "jsonwebtoken";
import { UserRepo } from "../db/fake/repo/users.js";

const router = express.Router();

// Signup route
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const result = UserRepo.register(username, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(201).json({ message: "User registered successfully" });
});

// Signin route
router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const result = UserRepo.findByCredentials(username, password);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  const user = result.user;

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res
    .cookie("authToken", token, {
      httpOnly: true, // 🔐 can't access via JS (protects from XSS)
      secure: false, // 🔒 only over HTTPS
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
    })
    .json({
      message: "Signed in successfully",
      user: { id: user.id, username: user.username, avatarUrl: user.avatarUrl },
    });
});

// Signout route
router.post("/signout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Signed out" });
});

export default router;
