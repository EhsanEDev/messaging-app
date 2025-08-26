import { User } from "@/constants/types";

export const getCurrentUser = (): User => {
  return {
    id: "1",
    username: "Ehsan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  };
}
