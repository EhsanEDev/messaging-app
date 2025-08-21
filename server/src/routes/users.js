import express from "express";
import { UserList } from "../constants/users.js";
const router = express.Router();

// users route
router.get("/", (req, res) => {
  // console.log(`Fetching chat with ID: ${chatId}`);
  res.status(200).json(
    UserList.map((user) => ({
      id: user.id,
      name: user.username,
      avatarUrl: `https://i.pravatar.cc/150?img=${user.id}`
    }))
  );
});

export default router;
