import express from "express";
import { ChatRepo } from "../db/fake/repo/chats.js";

const router = express.Router();

// return list of chats
router.get("/list", (req, res) => {
  // Fetch and return the list of chats
  const list = ChatRepo.findAll();
  res.status(201).json(list);
});

router.post("/create", (req, res) => {
  const participantIds = req.body.participantIds;
  if (!Array.isArray(participantIds) || participantIds.length === 0) {
    return res.status(400).json({ error: "Invalid participant IDs" });
  }
  if (participantIds.length === 1) {
    const newChat = ChatRepo.createPrivate(participantIds[0]);
    return res.status(201).json(newChat);
  }
  const newChat = ChatRepo.createGroup(req.user.id, participantIds);
  return res.status(201).json(newChat);
});

// return metadata of a particular chat
router.get("/:chatId", (req, res) => {
  const { chatId } = req.params;
  res.status(200).json({
    id: chatId,
    title: `User ${chatId}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${chatId}`,
    participants: [
      {
        id: "user1",
        username: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      {
        id: "user2",
        username: "User Two",
        avatarUrl: `https://i.pravatar.cc/150?img=2`,
      },
      {
        id: "user3",
        username: "User Three",
        avatarUrl: `https://i.pravatar.cc/150?img=3`,
      },
    ],
    lastMessage: {
      id: "100",
      chatId: chatId,
      content: "goodbye!",
      sender: {
        id: "user1",
        username: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      createdAt: new Date().toISOString(),
    },
  });
});

// return messages of a particular chat (filter by pages, perpage, fromId)
router.get("/:chatId/messages", (req, res) => {
  const { chatId } = req.params;
  // const { page = 1, perPage = 10, fromId } = req.query;

  // Simulate fetching messages from a database
  res.status(200).json(
    [
      {
        id: "1",
        chatId: "chat1",
        sender: {
          id: "0",
          username: "User 0",
          avatarUrl: `https://i.pravatar.cc/150?img=0`,
        },
        content: "Hello!",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        chatId: "chat1",
        sender: {
          id: "1",
          username: "User 1",
          avatarUrl: `https://i.pravatar.cc/150?img=1`,
        },
        content: "Hi there!",
        createdAt: new Date().toISOString(),
        reactedBy: [
          {
            id: "0",
            username: "User 0",
            avatarUrl: `https://i.pravatar.cc/150?img=0`,
            emoji: "👍",
            reactedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "3",
        chatId: "chat1",
        sender: {
          id: "0",
          username: "User 0",
          avatarUrl: `https://i.pravatar.cc/150?img=0`,
        },
        content: "How are you?",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        chatId: "chat1",
        sender: {
          id: "1",
          username: "User 1",
          avatarUrl: `https://i.pravatar.cc/150?img=1`,
        },
        content: "I'm good, thanks!",
        createdAt: new Date().toISOString(),
      },
    ].reverse()
  );
});

export default router;
