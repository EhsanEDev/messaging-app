import type { User } from "@/shared/types.js";

export const Users: User[] = [
  {
    id: "ehsan",
    username: "Ehsan",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "ehsan@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    createdAt: String(new Date()),
  },
  {
    id: "leo",
    username: "Leo",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "leo@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    createdAt: String(new Date()),
  },
  {
    id: "chandler",
    username: "Chandler",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "chandler@example.com",
    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    createdAt: String(new Date()),
  },
  {
    id: "clare",
    username: "Clare",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "clare@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    createdAt: String(new Date()),
  },
  {
    id: "amy",
    username: "Amy",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "amy@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    createdAt: String(new Date()),
  },
  {
    id: "melanie",
    username: "Melanie",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "melanie@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    createdAt: String(new Date()),
  },
  {
    id: "luis",
    username: "Luis",
    password: "$2b$10$CRkLoUkaAUJx6u3Vkd8Bbup79aEhCiU60MKta/M8AbKc/.8vDcQAi",
    email: "luis@example.com",

    isVerified: true,
    avatarUrl: "https://i.pravatar.cc/150?img=7",
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

  findByEmail(email: string): User | null {
    const normalizedEmail = email.trim().toLowerCase();
    return Users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
  },

  add(username: string, password: string, email: string): User {
    const newUser: User = {
      id: String(Date.now()),
      username,
      avatarUrl: `https://i.pravatar.cc/150?img=${Users.length + 1}`,
      password,
      email,
      isVerified: false,
      createdAt: String(new Date()),
    };
    Users.push(newUser);
    return newUser;
  },

  verifyEmail(email: string): User | null {
    const user = this.findByEmail(email);
    if (!user) return null;
    user.isVerified = true;
    return user;
  },
};
