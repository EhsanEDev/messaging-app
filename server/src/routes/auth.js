import express from "express";
import jwt from "jsonwebtoken";
import { findUserByCredentials } from "../utils/auth.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.json({ message: "Signup endpoint" });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // Here you would typically hash the password and save the user to the database
  res.status(201).json({ message: "User registered successfully" });
});

router.get("/signin", (req, res) => {
  res.json({ message: "Signin endpoint" });
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = findUserByCredentials(username, password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
