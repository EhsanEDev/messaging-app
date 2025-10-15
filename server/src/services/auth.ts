import { User } from "@/shared/types.js";
import bcrypt from "bcrypt";
import { ContactRepo } from "../db/fake/repo/contacts.js";
import { UserRepo } from "../db/fake/repo/users.js";

const AuthService = {
  signup: async (username: string, password: string, email: string): Promise<User> => {
    // Validate input
    if (!username || !password || !email) {
      throw new Error("Username, password, and email are required");
    }

    // Check if user exists
    const user = UserRepo.findByUsername(username);
    if (user) {
      throw new Error("Username has already been taken");
    }

    const emailExists = UserRepo.findByEmail(email);
    if (emailExists) {
      throw new Error("Email is already in use");
    }

    // if (password.length < 6) {
    //   throw new Error("Password is too weak");
    // }

    // Hash password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the user to repo and return it
    const newUser = UserRepo.add(username, hashedPassword, email);
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
