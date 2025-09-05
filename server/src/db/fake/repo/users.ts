import type { User } from "../../../constants/types.js";

export const UserList: User[] = [
    {
    id: "1756280677130",
    username: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    password: "123456"
  },
  {
    id: "1756280717140",
    username: "Leo",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    password: "123456"
  },
  {
    id: "1756280717150",
    username: "Chandler",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    password: "123456"
  },
  {
    id: "1756280717160",
    username: "Clare",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    password: "123456"
  },
  {
    id: "1756280717160",
    username: "Clare",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    password: "123456"
  },
  {
    id: "1756280717160",
    username: "Melanie",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    password: "123456"
  },
  {
    id: "1756280717160",
    username: "Luis",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    password: "123456"
  },
];

interface result {
  user?: User;
  error?: string;
  status: number;
}

export const UserRepo = {
  findAll() {
    return UserList;
  },

  findById(id: string) {
    return UserList.find((u) => u.id === id) || null;
  },

  findByUsername(username: string): User | null {
    const normalizedUsername = username.trim().toLowerCase();
    return UserList.find((u) => u.username.toLowerCase() === normalizedUsername) || null;
  },

  // findByCredentials(username: string, password: string): result {
  //   const user = this.findByUsername(username);
  //   if (!user) {
  //     return { error: "Username not found", status: 404 };
  //   }
  //   if (user.password !== password) {
  //     return { error: "Incorrect password", status: 401 };
  //   }
  //   return { user, status: 200 };
  // },

  register(username: string, password: string): result {
    const user = this.findByUsername(username);
    if (user) {
      return { error: "The username has already been taken", status: 409 };
    }
    const newUser: User = {
      id: String(Date.now()),
      username,
      avatarUrl: `https://i.pravatar.cc/150?img=${UserList.length + 1}`,
      password,
    };
    UserList.push(newUser);
    return { user: newUser, status: 201 };
  },
};
