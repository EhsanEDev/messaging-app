import { ChatMetadata, Message } from "@/constants/types";

export const getChatList = (): ChatMetadata[] => {

  return [{
    id: "1",
    title: `User 1`,
    avatarUrl: `https://i.pravatar.cc/150?img=1`,
    participants: [
      {
        id: "user1",
        name: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      {
        id: "user2",
        name: "User Two",
        avatarUrl: `https://i.pravatar.cc/150?img=2`,
      }
    ],
    lastMessage: {
        id: "100",
        chatId: "user1",
        content: "goodbye!",
        sender: {
          id: "user1",
          name: "User One",
          avatarUrl: `https://i.pravatar.cc/150?img=1`,
        },
        createdAt: new Date().toISOString(),
      },
    },
    {
      id: "2",
      title: `User 2`,
      avatarUrl: `https://i.pravatar.cc/150?img=2`,
      participants: [
        {
        id: "user1",
        name: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      {
        id: "user2",
        name: "User Two",
        avatarUrl: `https://i.pravatar.cc/150?img=2`,
      }
    ],
    lastMessage: {
        id: "100",
        chatId: "user1",
        content: "goodbye!",
        sender: {
          id: "user1",
          name: "User One",
          avatarUrl: `https://i.pravatar.cc/150?img=1`,
        },
        createdAt: new Date().toISOString(),
      },
    },
  ];
};

export const getChatMetadata = (chatId: string): ChatMetadata => {
  console.log(`Fetching metadata for chat: ${chatId}`);

  return {
    id: chatId,
    title: `User ${chatId}`,
    avatarUrl: `https://i.pravatar.cc/150?img=${chatId}`,
    participants: [
      {
        id: "user1",
        name: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      {
        id: "user2",
        name: "User Two",
        avatarUrl: `https://i.pravatar.cc/150?img=2`,
      },
      {
        id: "user3",
        name: "User Three",
        avatarUrl: `https://i.pravatar.cc/150?img=3`,
      },
    ],
    lastMessage: {
      id: "100",
      chatId: chatId,
      content: "goodbye!",
      sender: {
        id: "user1",
        name: "User One",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      createdAt: new Date().toISOString(),
    },
  };
};
export const getChatMessages = (chatId: string): Message[] => {
  return [
    {
      id: "1",
      chatId: "chat1",
      sender: {
        id: "0",
        name: "User 0",
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
        name: "User 1",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      content: "Hi there!",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      chatId: "chat1",
      sender: {
        id: "0",
        name: "User 0",
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
        name: "User 1",
        avatarUrl: `https://i.pravatar.cc/150?img=1`,
      },
      content: "I'm good, thanks!",
      createdAt: new Date().toISOString(),
    
    }
  ];
};
