import type { User } from "@/shared/types.js";

export const Users: User[] = [
  {
    id: "ehsan",
    username: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "leo",
    username: "Leo",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "chandler",
    username: "Chandler",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "clare",
    username: "Clare",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "amy",
    username: "Amy",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "melanie",
    username: "Melanie",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
  {
    id: "luis",
    username: "Luis",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    createdAt: String(new Date()),
  },
];

export const UserRepo = {
  validate(ids: string[]): boolean {
    return ids.every((id) => Users.some((u) => u.id === id));
  },

  getAll(): User[] {
    return Users;
  },

  findById(id: string): User | null {
    return Users.find((u) => u.id === id) || null;
  },

  findByUsername(username: string): User | null {
    const normalizedUsername = username.trim().toLowerCase();
    return (
      Users.find((u) => u.username.toLowerCase() === normalizedUsername) || null
    );
  },

  add(username: string, password: string): User {
    const newUser: User = {
      id: String(Date.now()),
      username,
      avatarUrl: `https://i.pravatar.cc/150?img=${Users.length + 1}`,
      password,
      createdAt: String(new Date()),
    };
    Users.push(newUser);
    return newUser;
  },
};
