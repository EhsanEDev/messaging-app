import express from "express";
import { UserList } from "../constants/users.js";
const router = express.Router();

// contact list
router.get("/list", (req, res) => {
  // console.log(`Fetching chat with ID: ${chatId}`);
  setTimeout(() => {
    res.status(200).json(
      UserList.map((user) => ({
        id: user.id,
        username: user.username,
        avatarUrl: `https://i.pravatar.cc/150?img=${user.id}`
      }))
    );
  }, 0);
});

export default router;
