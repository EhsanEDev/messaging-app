import express from "express";

const router = express.Router();

// chats route
router.get("/:chatId", (req, res) => {
  const { chatId } = req.params;
  // console.log(`Fetching chat with ID: ${chatId}`);

  res.status(200).json({
    id: chatId,
    title: "John Doe",
    avatarUrl: "https://example.com/avatar/john.jpg",
    lastMessage: "See you tomorrow!",
    lastMessageAt: "2025-08-09T12:45:32.000Z",
    unreadCount: 0,
    isOnline: true,
    participants: [
      {
        id: "user_1",
        name: "John Doe",
        avatarUrl: "https://example.com/avatar/john.jpg",
        isOnline: true,
      },
      {
        id: "user_2",
        name: "Ehsan",
        avatarUrl: "https://example.com/avatar/ehsan.jpg",
        isOnline: true,
      },
    ],
  });
});

export default router;
