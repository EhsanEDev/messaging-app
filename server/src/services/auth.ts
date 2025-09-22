import { User, Contact } from "@/shared/types.js";
import { UserRepo } from "../db/fake/repo/users.js";
import bcrypt from "bcrypt";
import { ContactRepo } from "../db/fake/repo/contacts.js";

const AuthService = {
  me: async (id: string): Promise<Contact> => {
    const user: User | null = UserRepo.findById(id);
    if (!user) {
      throw new Error("Username not found");
    }
    return {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl ?? "",
    };
  },

  signup: async (username: string, password: string): Promise<User> => {
    // Validate input
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Check if user exists
    const user = UserRepo.findByUsername(username);

    if (user) {
      throw new Error("Username has already been taken");
    }

    // if (password.length < 6) {
    //   throw new Error("Password is too weak");
    // }

    // Hash password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the user to repo and return it
    const newUser = UserRepo.add(username, hashedPassword);
    ContactRepo.add(newUser);
    return newUser;
  },

  signin: async (username: string, password: string): Promise<User> => {
    // Validate input
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Check if user exists
    const user = UserRepo.findByUsername(username);
    if (!user) {
      throw new Error("Username not found");
    }

    // Check if user's password is matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },
};

export default AuthService;
