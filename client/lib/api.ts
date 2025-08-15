export const getChatMetadata = (
  chatId: string
): {
  title: string;
  avatarUrl: string;
  membersCount: number;
} => {
  return {
    title: "Chat Title",
    avatarUrl: "https://example.com/avatar.jpg",
    membersCount: 3
  };
};
export const getChatMessages = (chatId: string) => {
  return [
    {
      id: "1",
      text: "Hello!",
      sender: "user1",
      timestamp: new Date().toISOString()
    },
    {
      id: "2",
      text: "Hi there!",
      sender: "user2",
      timestamp: new Date().toISOString()
    }
  ];
};
