import type { User } from "@/shared/types.js";

export const UserList: User[] = [
  {
    id: "ehsan",
    username: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    password: "123456",
  },
  {
    id: "leo",
    username: "Leo",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    password: "123456",
  },
  {
    id: "chandler",
    username: "Chandler",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    password: "123456",
  },
  {
    id: "clare",
    username: "Clare",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    password: "123456",
  },
  {
    id: "amy",
    username: "Amy",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    password: "123456",
  },
  {
    id: "melanie",
    username: "Melanie",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    password: "123456",
  },
  {
    id: "luis",
    username: "Luis",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    password: "123456",
  },
];

export const UserRepo = {
  validate(ids: string[]): boolean {
    return ids.every((id) => UserList.some((u) => u.id === id));
  },

  findAll(): User[] {
    return UserList;
  },

  findById(id: string): User | null {
    return UserList.find((u) => u.id === id) || null;
  },

  findByUsername(username: string): User | null {
    const normalizedUsername = username.trim().toLowerCase();
    return (
      UserList.find((u) => u.username.toLowerCase() === normalizedUsername) ||
      null
    );
  },

  add(username: string, password: string): User {
    const newUser: User = {
      id: String(Date.now()),
      username,
      avatarUrl: `https://i.pravatar.cc/150?img=${UserList.length + 1}`,
      password,
    };
    UserList.push(newUser);
    return newUser;
  },
};
