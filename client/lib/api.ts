import { ChatMetadata, Message, User } from "@/constants/types";

export const getContactList = async (userId: string): Promise<User[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/`,
    {
      credentials: "include",
    }
  );
  const data: User[] = await response.json();
  return data.filter((user) => user.id !== userId);
};

export const getChatList = async (): Promise<ChatMetadata[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/`,
    {
      credentials: "include",
    }
  );
  const data: ChatMetadata[] = await response.json();
  return data;
};

export const getChatMetadata = async (
  chatId: string
): Promise<ChatMetadata> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${chatId}`,
    {
      credentials: "include",
    }
  );
  const data: ChatMetadata = await response.json();
  return data;
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${chatId}/messages`,
    {
      credentials: "include",
    }
  );
  const data: Message[] = await response.json();
  return data;
};
