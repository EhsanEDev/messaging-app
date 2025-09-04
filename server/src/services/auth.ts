import { Contact } from "../constants/types.js";
import { UserRepo } from "../db/fake/repo/users.js";

const AuthService = {
  me: async (id: string): Promise<Contact> => {
    const user = UserRepo.findById(id);
    if (!user) {
      throw new Error("Username not found");
    }
    return {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
    };
  },

  signup: async (username: string, password: string) => {
    // const result = UserRepo.register(username, password);
    // return result;
  },

  signin: async (username: string, password: string) => {
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
    // const isMatch = await bcrypt.compare(password, user.passwordHash);
    const isMatch = user.password === password;
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  },

  signout: async () => {
    // return { status: 200, message: "Signed out" };
  },
};

export default AuthService;
