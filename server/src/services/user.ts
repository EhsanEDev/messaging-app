import { Contact, User } from "@/shared/types.js";
import { UserRepo } from "../db/fake/repo/users.js";

const UserService = {
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
};

export default UserService;
